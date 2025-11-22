
function deleteProduct(button, productId) {
    if (!confirm('Tem certeza que deseja remover este produto?')) {
        return;
    }

    fetch(`/api/products/delete/` + productId, {
        method: 'DELETE',
        headers: {

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


document.addEventListener('DOMContentLoaded', () => {


    const dropdownContainers = document.querySelectorAll('.dropdown-container');


    const closeAllDropdowns = () => {
        dropdownContainers.forEach(container => {
            container.classList.remove('open');
            container.querySelector('.dropdown-content').classList.add('hidden');
        });
    };

    dropdownContainers.forEach(container => {
        const toggle = container.querySelector('.dropdown-toggle');
        const content = container.querySelector('.dropdown-content');

        toggle.addEventListener('click', (e) => {
            e.stopPropagation();

            const isOpen = container.classList.contains('open');
            closeAllDropdowns();

            if (!isOpen) {
                container.classList.add('open');
                content.classList.remove('hidden');
            }
        });
    });

    //  Lógica da Ordenação -
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

                closeAllDropdowns();



                const sortValue = optionLink.dataset.sort;


                const url = new URL(window.location.href);

                url.searchParams.set('sort', sortValue);


                url.searchParams.set('page', '1');

                window.location.href = url.toString();
            });
        });
    }

    // Lógica do Filtro de Preço
    const applyPriceFilter = document.getElementById('apply-price-filter');
    if (applyPriceFilter) {
        applyPriceFilter.addEventListener('click', () => {
            const minPrice = document.getElementById('min-price').value;
            const maxPrice = document.getElementById('max-price').value;

            closeAllDropdowns();


            const url = new URL(window.location.href);


            url.searchParams.set('min', minPrice);
            url.searchParams.set('max', maxPrice);


            url.searchParams.set('page', '1');

            window.location.href = url.toString();
        });
    }


    document.addEventListener('click', (e) => {
        if (!e.target.closest('.dropdown-container')) {
            closeAllDropdowns();
        }
    });
});