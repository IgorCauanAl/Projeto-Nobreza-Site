document.addEventListener('DOMContentLoaded', () => {

    // === 1. Lógica para Adicionar e Remover Itens ===

    // Usamos 'document.body.addEventListener' para pegar botões
    // que são carregados dinamicamente (como em 'page_principal').
    // Adicionamos 'async' para poder usar 'await'
    document.body.addEventListener('click', async function(event) {

        // --- Lógica de ADICIONAR (Existente) ---
        if (event.target.classList.contains('btn-add-to-cart')) {
            event.preventDefault();
            const button = event.target;
            const productId = button.dataset.productId; // Pega o 'data-product-id'

            button.disabled = true;
            button.textContent = 'Adicionando...';

            // Usamos 'await' para esperar a função terminar
            await adicionarProdutoAoCarrinho(productId, 1, button);
        }

        // --- LÓGICA DE REMOVER (Existente) ---
        if (event.target.classList.contains('mini-cart-remove')) {
            event.preventDefault();
            const button = event.target;
            const itemId = button.dataset.itemId; // Pega o 'data-item-id'

            button.disabled = true;
            button.textContent = '...'; // Mostra que está carregando

            // Usamos 'await' para esperar a função terminar
            await removerProdutoDoCarrinho(itemId, button);
        }
    });

    async function adicionarProdutoAoCarrinho(productId, quantidade, button) {
        try {
            // (IMPORTANTE: Adicione o token CSRF se o Spring Security estiver ativo)
            const response = await fetch(`/api/cart/add/${productId}?quantidade=${quantidade}`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                }
            });

            const result = await response.json(); // Espera uma resposta JSON

            if (response.ok) {
                mostrarNotificacao(result.message, 'success');
                await atualizarMiniCarrinho(); // Atualiza o carrinho visual

            } else if (response.status === 401) {
                mostrarNotificacao(result.message || 'Você precisa estar logado!', 'error');
                // (Opcional: redirecionar para /login.html)
                // window.location.href = '/login.html';
            } else {
                mostrarNotificacao(result.message || 'Erro ao adicionar produto.', 'error');
            }

        } catch (error) {
            console.error('Erro de rede:', error);
            mostrarNotificacao('Erro de conexão.', 'error');
        } finally {
            // Re-abilita o botão, independentemente de sucesso ou falha
            if(button) {
                button.disabled = false;
                button.textContent = 'Adicionar ao Carrinho';
            }
        }
    }

    // --- FUNÇÃO PARA REMOVER (Existente) ---
    async function removerProdutoDoCarrinho(itemId, button) {
        try {
            // (IMPORTANTE: Adicione o token CSRF se o Spring Security estiver ativo)
            const response = await fetch(`/api/cart/remove/${itemId}`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                }
            });

            const result = await response.json();

            if (response.ok) {
                mostrarNotificacao(result.message, 'success');
                await atualizarMiniCarrinho(); // Atualiza a lista
            } else {
                mostrarNotificacao(result.message || 'Erro ao remover item.', 'error');
                // Re-abilita o botão se falhar
                if (button) {
                    button.disabled = false;
                    button.textContent = '×'; // O 'x' (times)
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


    // === 2. Lógica para Atualizar o Mini-Carrinho (MODIFICADA) ===

    const miniCartItemsContainer = document.getElementById('mini-cart-items');
    const miniCartTotalEl = document.getElementById('mini-cart-total');
    const cartCountEl = document.getElementById('number-purchases').querySelector('p');

    // --- LÓGICA DO BOTÃO "FINALIZAR COMPRA" (ADICIONADA) ---
    const checkoutButton = document.getElementById('mini-cart-checkout');
    if (checkoutButton) {
        checkoutButton.addEventListener('click', () => {
            // Redireciona para o controller de Checkout (sem parâmetros)
            // Isso indica ao controller para carregar todos os itens do carrinho.
            window.location.href = '/checkout';
        });
    }
    // --- FIM DA LÓGICA ADICIONADA ---

    async function atualizarMiniCarrinho() {
        try {
            const response = await fetch('/api/cart/items');

            if (response.status === 401) {
                limparMiniCarrinhoVisual(); // Não logado, limpa visual
                return;
            }
            if (!response.ok) {
                throw new Error('Falha ao buscar itens');
            }

            const items = await response.json();

            miniCartItemsContainer.innerHTML = ''; // Limpa o carrinho

            if (items.length === 0) {
                miniCartItemsContainer.innerHTML = '<p style="padding: 10px; text-align: center;">Seu carrinho está vazio.</p>';
            }

            let totalItens = 0;
            let precoTotal = 0;

            items.forEach(item => {
                // --- HTML DO ITEM MODIFICADO ---
                // Adicionamos o botão 'mini-cart-remove' com o ID do item
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

            // Atualiza contadores
            cartCountEl.textContent = totalItens;
            miniCartTotalEl.textContent = `Total: R$ ${precoTotal.toFixed(2)}`;

        } catch (error) {
            console.error('Erro ao atualizar mini-carrinho:', error);
            limparMiniCarrinhoVisual();
        }
    }

    function limparMiniCarrinhoVisual() {
        miniCartItemsContainer.innerHTML = '<p style="padding: 10px; text-align: center;">Seu carrinho está vazio.</p>';
        cartCountEl.textContent = '0';
        miniCartTotalEl.textContent = 'Total: R$ 0,00';
    }

    // === 3. Lógica da Notificação (O "aviso") ===
    function mostrarNotificacao(mensagem, tipo = 'success') {
        const notificacao = document.createElement('div');
        notificacao.className = `cart-notification ${tipo}`; // 'success' ou 'error'
        notificacao.textContent = mensagem;

        document.body.appendChild(notificacao);

        setTimeout(() => {
            notificacao.classList.add('show');
        }, 10);

        setTimeout(() => {
            notificacao.classList.remove('show');
            setTimeout(() => {
                if (document.body.contains(notificacao)) {
                    document.body.removeChild(notificacao);
                }
            }, 500);
        }, 3000);
    }

    // === 4. Carregar carrinho ao iniciar a página ===
    atualizarMiniCarrinho();

});