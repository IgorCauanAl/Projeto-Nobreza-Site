document.addEventListener("DOMContentLoaded", () => {

    /**
     * Esta função configura a paginação AJAX para um wrapper.
     * @param {string} wrapperId O ID do 'div' (fragmento) que será substituído.
     * @param {string} fragmentUrl O endpoint da API que retorna o novo HTML.
     */
    function setupPagination(wrapperId, fragmentUrl) {
        const wrapper = document.getElementById(wrapperId);

        if (!wrapper) {
            console.error(`Wrapper ${wrapperId} não encontrado.`);
            return;
        }

        // Usamos 'delegation' para ouvir cliques no wrapper
        wrapper.addEventListener("click", function(event) {
            // Verifica se o clique foi em uma 'bolinha' (link)
            if (event.target.tagName === 'A' && event.target.classList.contains('little-ball')) {

                // 1. Previne o recarregamento da página (a mágica acontece aqui)
                event.preventDefault();

                const link = event.target;
                const url = new URL(link.href);

                // 2. Monta a URL para o *fragmento*
                const mw_page = url.searchParams.get("mw_page");
                const n_page = url.searchParams.get("n_page");
                const fetchUrl = `${fragmentUrl}?mw_page=${mw_page}&n_page=${n_page}`;

                // 3. Adiciona animação de Fade-out
                wrapper.style.opacity = 0;

                // 4. Busca o novo conteúdo (o fragmento HTML) via AJAX
                fetch(fetchUrl)
                    .then(response => response.text())
                    .then(html => {
                        // 5. Substitui o HTML antigo pelo novo
                        wrapper.innerHTML = html;

                        // 6. Atualiza a URL na barra do navegador (sem recarregar)
                        const pageUrl = `${url.pathname}?mw_page=${mw_page}&n_page=${n_page}`;
                        history.pushState(null, '', pageUrl);

                        // 7. Adiciona animação de Fade-in
                        wrapper.style.opacity = 1;
                    })
                    .catch(error => {
                        console.error("Erro ao carregar a paginação:", error);
                        wrapper.style.opacity = 1; // Retorna a opacidade se der erro
                    });
            }
        });
    }

    // Inicializa a paginação AJAX para as duas seções
    setupPagination("most-wanted-wrapper", "/api/fragments/most-wanted");
    setupPagination("news-wrapper", "/api/fragments/news");

    // Adiciona o CSS para a animação de fade
    const style = document.createElement('style');
    style.innerHTML = `
    #most-wanted-wrapper, #news-wrapper {
      transition: opacity 0.3s ease-in-out;
    }
  `;
    document.head.appendChild(style);

});