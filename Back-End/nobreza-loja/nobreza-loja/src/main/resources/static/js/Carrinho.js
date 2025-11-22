
let globalCartItemCount = 0;

async function adicionarProdutoAoCarrinho(productId, quantidade, button) {
    try {
        const response = await fetch(`/api/cart/add/${productId}?quantidade=${quantidade}`, {
            method: 'POST',
            headers: { 'Accept': 'application/json' }
        });
        const result = await response.json();
        if (response.ok) {
            mostrarNotificacao(result.message, 'success');
            await atualizarMiniCarrinho();
        } else if (response.status === 401) {
            mostrarNotificacao(result.message || 'Você precisa estar logado!', 'error');
        } else {
            mostrarNotificacao(result.message || 'Erro ao adicionar produto.', 'error');
        }
    } catch (error) {
        console.error('Erro de rede:', error);
        mostrarNotificacao('Erro de conexão.', 'error');
    } finally {
        if(button) {
            button.disabled = false;
            if (button.id === 'btn-buy-now') {
                button.textContent = 'Comprar';
            } else {
                button.textContent = 'Adicionar ao Carrinho';
            }
        }
    }
}

async function removerProdutoDoCarrinho(itemId, button) {
    try {
        const response = await fetch(`/api/cart/remove/${itemId}`, {
            method: 'POST',
            headers: { 'Accept': 'application/json' }
        });
        const result = await response.json();
        if (response.ok) {
            mostrarNotificacao(result.message, 'success');
            await atualizarMiniCarrinho();
        } else {
            mostrarNotificacao(result.message || 'Erro ao remover item.', 'error');
            if (button) {
                button.disabled = false;
                button.textContent = '×';
            }
        }
    } catch (error) {
        console.error('Erro de rede:', error);
        mostrarNotificacao('Erro de conexão.', 'error');
        if (button) {
            button.disabled = false;
            button.textContent = '×';
        }
    }
}

async function atualizarMiniCarrinho() {
    const miniCartItemsContainer = document.getElementById('mini-cart-items');
    const miniCartTotalEl = document.getElementById('mini-cart-total');
    const cartCountEl = document.getElementById('number-purchases').querySelector('p');
    const checkoutButton = document.getElementById('mini-cart-checkout');

    try {
        const response = await fetch('/api/cart/items');
        if (response.status === 401) {
            limparMiniCarrinhoVisual(); return;
        }
        if (!response.ok) { throw new Error('Falha ao buscar itens'); }

        const items = await response.json();
        miniCartItemsContainer.innerHTML = '';
        if (items.length === 0) {
            miniCartItemsContainer.innerHTML = '<p style="padding: 10px; text-align: center;">Seu carrinho está vazio.</p>';
        }

        let totalItens = 0;
        let precoTotal = 0;

        items.forEach(item => {
            const itemHtml = `
                <div class="mini-cart-item" data-item-id="${item.id}">
                    <img src="${item.imagemUrl}" alt="${item.nomeProduto}" class="mini-cart-img"/>
                    <div class="mini-cart-info">
                        <p class="mini-cart-nome">${item.nomeProduto}</p>
                        <p class="mini-cart-preco">${item.quantidade} x R$ ${item.precoProduto.toFixed(2)}</p>
                    </div>
                    <button class="mini-cart-remove" data-item-id="${item.id}" title="Remover item">
                        &times;
                    </button>
                </div>
            `;
            miniCartItemsContainer.innerHTML += itemHtml;
            totalItens += item.quantidade;
            precoTotal += item.precoProduto * item.quantidade;
        });

        globalCartItemCount = totalItens;

        cartCountEl.textContent = totalItens;
        miniCartTotalEl.textContent = `Total: R$ ${precoTotal.toFixed(2)}`;

        if (checkoutButton) {
            if (totalItens === 0) {
                checkoutButton.classList.add('disabled-checkout');
            } else {
                checkoutButton.classList.remove('disabled-checkout');
            }
        }
    } catch (error) {
        console.error('Erro ao atualizar mini-carrinho:', error);
        limparMiniCarrinhoVisual();
    }
}

function limparMiniCarrinhoVisual() {
    const miniCartItemsContainer = document.getElementById('mini-cart-items');
    const miniCartTotalEl = document.getElementById('mini-cart-total');
    const cartCountEl = document.getElementById('number-purchases').querySelector('p');
    const checkoutButton = document.getElementById('mini-cart-checkout');

    miniCartItemsContainer.innerHTML = '<p style="padding: 10px; text-align: center;">Seu carrinho está vazio.</p>';
    cartCountEl.textContent = '0';
    miniCartTotalEl.textContent = 'Total: R$ 0,00';

    globalCartItemCount = 0;

    if (checkoutButton) {
        checkoutButton.classList.add('disabled-checkout');
    }
}

function mostrarNotificacao(mensagem, tipo = 'success') {
    const notificacao = document.createElement('div');
    notificacao.className = `cart-notification ${tipo}`;
    notificacao.textContent = mensagem;
    document.body.appendChild(notificacao);
    setTimeout(() => notificacao.classList.add('show'), 10);
    setTimeout(() => {
        notificacao.classList.remove('show');
        setTimeout(() => {
            if (document.body.contains(notificacao)) {
                document.body.removeChild(notificacao);
            }
        }, 500);
    }, 3000);
}


document.addEventListener('DOMContentLoaded', () => {

    // LÓGICA PARA ABRIR/FECHAR O MINI-CARRINHO
    const cartToggleButton = document.getElementById('circle-cart');
    const miniCart = document.getElementById('mini-cart');
    const miniCartCloseButton = document.getElementById('mini-cart-close');
    if (cartToggleButton && miniCart) {
        cartToggleButton.addEventListener('click', (event) => {
            event.stopPropagation();
            miniCart.classList.toggle('hidden');
        });
    }
    if (miniCartCloseButton && miniCart) {
        miniCartCloseButton.addEventListener('click', () => {
            miniCart.classList.add('hidden');
        });
    }
    document.addEventListener('click', (event) => {
        if (miniCart && !miniCart.classList.contains('hidden')) {
            const isClickInsideCart = miniCart.contains(event.target);
            const isClickOnToggleButton = cartToggleButton.contains(event.target);
            if (!isClickInsideCart && !isClickOnToggleButton) {
                miniCart.classList.add('hidden');
            }
        }
    });

    // LISTENERS GLOBAIS DE ADICIONAR E REMOVER
    document.body.addEventListener('click', async function(event) {
        if (event.target.classList.contains('btn-add-to-cart')) {
            event.preventDefault();
            const button = event.target;
            const productId = button.dataset.productId;
            button.disabled = true;
            button.textContent = 'Adicionando...';
            await adicionarProdutoAoCarrinho(productId, 1, button);
        }
        if (event.target.classList.contains('mini-cart-remove')) {
            event.preventDefault();
            const button = event.target;
            const itemId = button.dataset.itemId;
            button.disabled = true;
            button.textContent = '...';
            await removerProdutoDoCarrinho(itemId, button);
        }
    });

    // LÓGICA DO BOTÃO "FINALIZAR COMPRA"
    const checkoutButton = document.getElementById('mini-cart-checkout');
    if (checkoutButton) {
        checkoutButton.addEventListener('click', (event) => {

            if (globalCartItemCount === 0) {
                event.preventDefault();
                mostrarNotificacao('Seu carrinho está vazio!', 'error');
                return;
            }

            window.location.href = '/checkout';
        });
    }

    // CARREGAR CARRINHO AO INICIAR A PÁGINA
    atualizarMiniCarrinho();

});