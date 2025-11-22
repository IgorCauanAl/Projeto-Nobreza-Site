document.addEventListener("DOMContentLoaded", () => {

    function setupPagination(wrapperId, fragmentUrl) {
        const wrapper = document.getElementById(wrapperId);

        if (!wrapper) {
            console.error(`Wrapper ${wrapperId} não encontrado.`);
            return;
        }

        wrapper.addEventListener("click", function(event) {
            if (event.target.tagName === 'A' && event.target.classList.contains('little-ball')) {

                event.preventDefault();

                const link = event.target;
                const url = new URL(link.href);

                const mw_page = url.searchParams.get("mw_page");
                const n_page = url.searchParams.get("n_page");
                const fetchUrl = `${fragmentUrl}?mw_page=${mw_page}&n_page=${n_page}`;

                wrapper.style.opacity = 0;

                fetch(fetchUrl)
                    .then(response => response.text())
                    .then(html => {
                        wrapper.innerHTML = html;

                        const pageUrl = `${url.pathname}?mw_page=${mw_page}&n_page=${n_page}`;
                        history.pushState(null, '', pageUrl);

                        wrapper.style.opacity = 1;
                    })
                    .catch(error => {
                        console.error("Erro ao carregar a paginação:", error);
                        wrapper.style.opacity = 1;
                    });
            }
        });
    }

    setupPagination("most-wanted-wrapper", "/api/fragments/most-wanted");
    setupPagination("news-wrapper", "/api/fragments/news");

    const style = document.createElement('style');
    style.innerHTML = `
    #most-wanted-wrapper, #news-wrapper {
      transition: opacity 0.3s ease-in-out;
    }
  `;
    document.head.appendChild(style);

});