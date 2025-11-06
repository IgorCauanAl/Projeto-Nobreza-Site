// Arquivo: /js/clothes/clothe.js

document.addEventListener('DOMContentLoaded', () => {

    const qtyDisplay = document.getElementById('qty-display');
    const qtyPlus = document.getElementById('qty-plus');
    const qtyMinus = document.getElementById('qty-minus');

    if (qtyDisplay && qtyPlus && qtyMinus) {
        qtyPlus.addEventListener('click', () => {
            let currentQty = parseInt(qtyDisplay.textContent, 10);
            qtyDisplay.textContent = currentQty + 1;
        });

        qtyMinus.addEventListener('click', () => {
            let currentQty = parseInt(qtyDisplay.textContent, 10);
            if (currentQty > 1) {
                qtyDisplay.textContent = currentQty - 1;
            }
        });
    }

    const buyNowButton = document.getElementById('btn-buy-now');

    if (buyNowButton) {
        buyNowButton.addEventListener('click', () => {
            const productId = buyNowButton.dataset.productId;
            const quantity = parseInt(qtyDisplay.textContent, 10) || 1;

            // Redireciona para o controller de Checkout com os parâmetros
            window.location.href = `/checkout?productId=${productId}&qty=${quantity}`;
        });
    }


    const accordionHeaders = document.querySelectorAll(".accordion-header");

    accordionHeaders.forEach((header) => {
        header.addEventListener("click", () => {
            // Encontra o elemento de conteúdo irmão (o painel a ser expandido)
            const content = header.nextElementSibling;

            // Verifica se o conteúdo está ativo/aberto
            const isContentActive = content.classList.contains("active");

            // --- Fechar todos os outros painéis ---
            // Percorre todos os cabeçalhos novamente
            accordionHeaders.forEach((otherHeader) => {
                const otherContent = otherHeader.nextElementSibling;
                // Remove a classe 'active' de todos os outros conteúdos e cabeçalhos
                if (otherContent !== content) {
                    otherContent.classList.remove("active");
                    otherHeader.classList.remove("active");
                }
            });

            // --- Abrir ou Fechar o painel clicado ---
            if (isContentActive) {
                // Se estava aberto, fecha
                content.classList.remove("active");
                header.classList.remove("active");
            } else {
                // Se estava fechado, abre
                content.classList.add("active");
                header.classList.add("active");
            }
        });
    });

});