/* =======================================================
   SEU NOVO ARQUIVO (js/clothes/clothe.js)
   ======================================================= */

document.addEventListener('DOMContentLoaded', () => {

    // Elementos da página de detalhes
    const buyButton = document.getElementById('btn-buy-now');
    const qtyDisplay = document.getElementById('qty-display');
    const qtyMinus = document.getElementById('qty-minus');
    const qtyPlus = document.getElementById('qty-plus');
    const stockQuantityEl = document.getElementById('stock-quantity');

    // Pega o estoque máximo do HTML
    const maxStock = stockQuantityEl ? parseInt(stockQuantityEl.textContent, 10) : 100;

    // --- 1. Lógica do Seletor de Quantidade ---

    let currentQuantity = 1;

    if (qtyPlus) {
        qtyPlus.addEventListener('click', () => {
            // Só aumenta se for menor que o estoque
            if (currentQuantity < maxStock) {
                currentQuantity++;
                qtyDisplay.textContent = currentQuantity;
            }
        });
    }

    if (qtyMinus) {
        qtyMinus.addEventListener('click', () => {
            // Só diminui se for maior que 1
            if (currentQuantity > 1) {
                currentQuantity--;
                qtyDisplay.textContent = currentQuantity;
            }
        });
    }

    // --- 2. Lógica do Botão Comprar ---

    if (buyButton) {
        buyButton.addEventListener('click', async (event) => {
            event.preventDefault();

            const productId = buyButton.dataset.productId;
            const quantity = parseInt(qtyDisplay.textContent, 10);

            buyButton.disabled = true;
            buyButton.textContent = 'Adicionando...';

            await adicionarProdutoAoCarrinho(productId, quantity, buyButton);
        });
    }



});