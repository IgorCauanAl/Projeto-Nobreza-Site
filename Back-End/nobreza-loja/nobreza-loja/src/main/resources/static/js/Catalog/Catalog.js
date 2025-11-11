/**
 * Função para deletar um produto.
 */
function deleteProduct(button, productId) {
    if (!confirm('Tem certeza que deseja remover este produto?')) {
        return;
    }

    fetch(`/api/products/delete/` + productId, {
        method: 'DELETE',
        headers: {
            // Adicione headers de autorização se necessário
        }
    })
        .then(response => {
            if (response.ok) {
                alert('Produto removido!');
                // Remove o item da tela sem recarregar a página
                const productElement = button.closest('.conjugate');
                if (productElement) {
                    productElement.remove();
                }
            } else {
                alert('Erro ao remover o produto.');
            }
        })
        .catch(error => {
            console.error('Erro:', error);
            alert('Erro de rede ao tentar remover o produto.');
        });
}

/**
 * Lógica para controlar os Dropdowns de Filtro e Ordenação
 */
document.addEventListener('DOMContentLoaded', () => {

    // Seleciona todos os containers de dropdown
    const dropdownContainers = document.querySelectorAll('.dropdown-container');

    // Função para fechar todos os dropdowns
    const closeAllDropdowns = () => {
        dropdownContainers.forEach(container => {
            container.classList.remove('open');
            container.querySelector('.dropdown-content').classList.add('hidden');
        });
    };

    // Adiciona evento de clique para cada dropdown
    dropdownContainers.forEach(container => {
        const toggle = container.querySelector('.dropdown-toggle');
        const content = container.querySelector('.dropdown-content');

        toggle.addEventListener('click', (e) => {
            e.stopPropagation(); // Impede que o clique feche o menu imediatamente

            const isOpen = container.classList.contains('open');
            closeAllDropdowns();

            if (!isOpen) {
                container.classList.add('open');
                content.classList.remove('hidden');
            }
        });
    });

    // --- Lógica Específica da Ordenação ---
    const ordinationOptions = document.getElementById('ordination-options');
    if (ordinationOptions) {
        ordinationOptions.querySelectorAll('a').forEach(optionLink => {
            optionLink.addEventListener('click', (e) => {
                e.preventDefault();

                const newSortText = optionLink.textContent;
                document.getElementById('selected-sort').textContent = newSortText;

                ordinationOptions.querySelectorAll('li').forEach(li => {
                    li.classList.remove('selected');
                });
                optionLink.closest('li').classList.add('selected');

                closeAllDropdowns(); // Fecha o menu

                // --- BLOCO ATUALIZADO ---
                // Pega o valor data-sort (ex: "price-desc")
                const sortValue = optionLink.dataset.sort;

                // Pega a URL atual
                const url = new URL(window.location.href);

                // Define o novo parâmetro 'sort'
                url.searchParams.set('sort', sortValue);

                // Ao reordenar, sempre volte para a página 1
                url.searchParams.set('page', '1');

                // Recarrega a página com os novos parâmetros
                window.location.href = url.toString();
            });
        });
    }

    // --- Lógica Específica do Filtro de Preço ---
    const applyPriceFilter = document.getElementById('apply-price-filter');
    if (applyPriceFilter) {
        applyPriceFilter.addEventListener('click', () => {
            const minPrice = document.getElementById('min-price').value;
            const maxPrice = document.getElementById('max-price').value;

            closeAllDropdowns(); // Fecha o menu

            // --- BLOCO ATUALIZADO ---
            const url = new URL(window.location.href);

            // Adiciona os parâmetros de preço.
            // O backend deve saber o que fazer se eles vierem vazios.
            url.searchParams.set('min', minPrice);
            url.searchParams.set('max', maxPrice);

            // Ao filtrar, sempre volte para a página 1
            url.searchParams.set('page', '1');

            // Recarrega a página com os novos parâmetros
            window.location.href = url.toString();
        });
    }

    // Fecha os dropdowns se clicar em qualquer lugar fora deles
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.dropdown-container')) {
            closeAllDropdowns();
        }
    });
});