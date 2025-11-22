// VARIÁVEIS E FUNÇÕES GLOBAIS
let globalCartItemCount = 0;

// Variáveis do Carrossel
let slides;
let totalSlides;
let banner;
let currentSlideIndex = 0;

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
    const cartCountEl = document.getElementById('number-purchases') ? document.getElementById('number-purchases').querySelector('p') : null;
    const checkoutButton = document.getElementById('mini-cart-checkout');

    if (!miniCartItemsContainer || !miniCartTotalEl || !cartCountEl) return;

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
    const cartCountEl = document.getElementById('number-purchases') ? document.getElementById('number-purchases').querySelector('p') : null;
    const checkoutButton = document.getElementById('mini-cart-checkout');

    if (miniCartItemsContainer) miniCartItemsContainer.innerHTML = '<p style="padding: 10px; text-align: center;">Seu carrinho está vazio.</p>';
    if (cartCountEl) cartCountEl.textContent = '0';
    if (miniCartTotalEl) miniCartTotalEl.textContent = 'Total: R$ 0,00';


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


// FUNÇÕES DO CARROSSEL
function showSlide(index, direction = "next") {
    // Garantir que as variáveis foram inicializadas no DOMContentLoaded
    if (!slides || slides.length === 0 || !banner) {
        console.warn("Carrossel não inicializado. Verifique a estrutura HTML.");
        return;
    }

    if (index >= totalSlides) {
        currentSlideIndex = 0;
    } else if (index < 0) {
        currentSlideIndex = totalSlides - 1;
    } else {
        currentSlideIndex = index;
    }

    slides.forEach((slide) => {
        slide.classList.remove("active");
        const mainText = slide.querySelector(".main-text");
        if(mainText) {
            mainText.classList.remove("slide-in-right", "slide-in-left");
        }
    });

    const newSlide = slides[currentSlideIndex];

    // Limpa classes de slides anteriores do banner
    banner.className = banner.className.replace(/active-slide-\w+/g, '').trim();

    // Aplica o ID do slide como classe ao banner
    if (newSlide.id) {
        banner.classList.add(`active-slide-${newSlide.id}`);
    }

    newSlide.classList.add("active");
    const textElement = newSlide.querySelector(".main-text");

    if (textElement) {
        if (direction === "next") {
            textElement.classList.add("slide-in-right");
        } else if (direction === "prev") {
            textElement.classList.add("slide-in-left");
        }
    }

    const newImage = newSlide.getAttribute("data-image");
    if (newImage) {
        banner.style.backgroundImage = `url('${newImage}')`;
    }
}

// Funções nextSlide e prevSlide estão no escopo global
function nextSlide() { showSlide(currentSlideIndex + 1, "next"); }
function prevSlide() { showSlide(currentSlideIndex - 1, "prev"); }


// LÓGICA DA PÁGINA (Executada após o carregamento do DOM)
document.addEventListener('DOMContentLoaded', () => {

    // INICIALIZAÇÃO DO CARROSSEL
    slides = document.querySelectorAll(".carousel-item");
    totalSlides = slides.length;
    banner = document.getElementById("banner");

    if (slides.length > 0) {
        showSlide(0);
    }

    // LÓGICA DO SUB-SEARCH (BARRA DE BUSCA)
    const searchTrigger = document.getElementById("search");
    const subSearchHidden = document.getElementById("sub-search-hidden");
    const searchInput = subSearchHidden ? subSearchHidden.querySelector(".search-box") : null;
    const closeButton = document.querySelector("#close .button-search");
    let closeTimer;

    function openSubSearch() {
        clearTimeout(closeTimer);
        subSearchHidden.classList.add("show-hidden");
    }

    function startCloseTimer() {
        closeTimer = setTimeout(() => {
            subSearchHidden.classList.remove("show-hidden");
        }, 150);
    }

    if (searchTrigger && subSearchHidden && searchInput && closeButton) {
        searchTrigger.addEventListener("mouseover", openSubSearch);
        subSearchHidden.addEventListener("mouseover", openSubSearch);
        searchTrigger.addEventListener("mouseout", startCloseTimer);
        subSearchHidden.addEventListener("mouseout", startCloseTimer);
        searchTrigger.addEventListener("click", (e) => {
            e.preventDefault();
            openSubSearch();
            searchInput.focus();
        });
        closeButton.addEventListener("click", (event) => {
            event.preventDefault();
            subSearchHidden.classList.remove("show-hidden");
        });
    }

    // LÓGICA DO MENU DE PRODUTOS
    const productsMenuItem = document.getElementById("products");
    const menuProductsHidden = document.getElementById("menu-products-hidden");
    const productsLink = productsMenuItem ? productsMenuItem.querySelector("a") : null;
    let closeTimerProducts;

    function openProductsMenu() {
        clearTimeout(closeTimerProducts);
        menuProductsHidden.classList.add("show");
    }

    function startCloseTimerProducts() {
        closeTimerProducts = setTimeout(() => {
            menuProductsHidden.classList.remove("show");
        }, 100);
    }

    if (productsMenuItem && menuProductsHidden && productsLink) {
        productsMenuItem.addEventListener("mouseover", openProductsMenu);
        menuProductsHidden.addEventListener("mouseover", openProductsMenu);
        productsMenuItem.addEventListener("mouseout", startCloseTimerProducts);
        menuProductsHidden.addEventListener("mouseout", startCloseTimerProducts);
        productsLink.addEventListener("click", (event) => {
            event.preventDefault();
        });
    }

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