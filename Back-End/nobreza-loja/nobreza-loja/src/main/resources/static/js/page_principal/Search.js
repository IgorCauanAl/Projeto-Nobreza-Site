
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.querySelector('.search-box');
    const suggestionsPopup = document.getElementById('search-suggestions-popup');
    const queryList = suggestionsPopup.querySelector('.query-suggestions-list');
    const productList = suggestionsPopup.querySelector('.product-suggestions-list');

    let debounceTimer;

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.trim();


        clearTimeout(debounceTimer);

        if (query.length < 2) {

            suggestionsPopup.classList.add('search-suggestions-hidden');
            return;
        }

        // debounce
        debounceTimer = setTimeout(() => {
            fetchSuggestions(query);
        }, 300); // Espera 300ms após o usuário parar de digitar
    });

    async function fetchSuggestions(query) {
        try {

            const response = await fetch(`/api/search/suggest?query=${encodeURIComponent(query)}`);
            if (!response.ok) {
                throw new Error('Erro ao buscar sugestões');
            }

            const data = await response.json();

            renderSuggestions(data);

        } catch (error) {
            console.error(error);
            suggestionsPopup.classList.add('search-suggestions-hidden');
        }
    }

    function renderSuggestions(data) {

        queryList.innerHTML = '';
        productList.innerHTML = '';


        if (data.textSuggestions.length === 0 && data.productSuggestions.length === 0) {
            suggestionsPopup.classList.add('search-suggestions-hidden');
            return;
        }

        data.textSuggestions.forEach(text => {
            queryList.innerHTML += `
                <li>
                    <a href="/search?q=${encodeURIComponent(text)}">
                        <img src="/img/icones/shop_principal/lupa.svg" alt="">
                        <span>${text}</span>
                    </a>
                </li>
            `;
        });

        data.productSuggestions.forEach(product => {
            productList.innerHTML += `
                <a href="/produto/${product.id}" class="product-suggestion-card">
                    <img src="${product.imageUrl}" alt="${product.name}">
                    <div class="product-suggestion-info">
                        <p class="product-suggestion-title">${product.name}</p>
                    </div>
                </a>
            `;
        });

        suggestionsPopup.classList.remove('search-suggestions-hidden');
    }

    document.addEventListener('click', (e) => {
        if (!searchInput.contains(e.target)) {
            suggestionsPopup.classList.add('search-suggestions-hidden');
        }
    });
});