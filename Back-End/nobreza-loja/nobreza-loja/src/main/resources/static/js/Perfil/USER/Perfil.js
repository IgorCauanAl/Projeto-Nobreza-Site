// Aguarda o carregamento completo do conteúdo da página antes de executar o script
document.addEventListener("DOMContentLoaded", function () {
    const navLinks = document.querySelectorAll(".nav-link");

    const contentSections = document.querySelectorAll(".content-section");

    // Adiciona um evento de clique para cada link de navegação
    navLinks.forEach((link) => {
        link.addEventListener("click", function (event) {

            event.preventDefault();


            const targetId = this.getAttribute("data-target");

            // Remove a classe 'active' de TODOS os links de navegação
            navLinks.forEach((navLink) => navLink.classList.remove("active"));
            // Remove a classe 'active' de TODAS as seções de conteúdo
            contentSections.forEach((section) => section.classList.remove("active"));

            // Adiciona a classe 'active' APENAS ao link que foi clicado
            this.classList.add("active");
            // Encontra a seção de conteúdo correspondente e adiciona a classe 'active' para exibi-la
            document.getElementById(targetId).classList.add("active");
        });
    });
});