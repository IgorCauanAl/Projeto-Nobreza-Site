document.addEventListener('DOMContentLoaded', () => {

    // Seleção de elementos do produto
    const buyButton = document.getElementById('btn-buy-now');
    const qtyDisplay = document.getElementById('qty-display');
    const qtyMinus = document.getElementById('qty-minus');
    const qtyPlus = document.getElementById('qty-plus');
    const stockQuantityEl = document.getElementById('stock-quantity');

    // Lógica de controle de estoque
    const maxStock = stockQuantityEl ? parseInt(stockQuantityEl.textContent, 10) : 100;
    let currentQuantity = 1;

    if (qtyPlus) {
        qtyPlus.addEventListener('click', () => {
            if (currentQuantity < maxStock) {
                currentQuantity++;
                qtyDisplay.textContent = currentQuantity;
            }
        });
    }

    if (qtyMinus) {
        qtyMinus.addEventListener('click', () => {
            if (currentQuantity > 1) {
                currentQuantity--;
                qtyDisplay.textContent = currentQuantity;
            }
        });
    }

    // Lógica do botão de compra
    if (buyButton) {
        buyButton.addEventListener('click', async (event) => {
            event.preventDefault();

            const productId = buyButton.dataset.productId;
            const quantity = parseInt(qtyDisplay.textContent, 10);

            buyButton.disabled = true;
            buyButton.textContent = 'Adicionando...';

            // Certifique-se que a função adicionarProdutoAoCarrinho existe no escopo global
            if (typeof adicionarProdutoAoCarrinho === 'function') {
                await adicionarProdutoAoCarrinho(productId, quantity, buyButton);
            } else {
                console.error('Função adicionarProdutoAoCarrinho não encontrada');
                buyButton.disabled = false;
                buyButton.textContent = 'Comprar';
            }
        });
    }

    // Lógica dos menus retráteis (Accordions)
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            header.classList.toggle('active');

            const content = header.nextElementSibling;

            if (content.style.maxHeight) {
                content.style.maxHeight = null;
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });});
});