// Aguarda o carregamento completo do HTML antes de executar o script
document.addEventListener("DOMContentLoaded", function () {
  // 1. Seleciona todos os links de navegação da barra lateral
  const navLinks = document.querySelectorAll(".nav-link");

  // 2. Seleciona todas as seções de conteúdo que podem ser exibidas
  const contentSections = document.querySelectorAll(".content-section");

  // 3. Adiciona um "ouvinte" de clique para cada link de navegação
  navLinks.forEach((link) => {
    link.addEventListener("click", function (event) {
      // Impede a ação padrão do link (que seria recarregar a página)
      event.preventDefault();

      // Pega o ID da seção alvo do atributo 'data-target' do link clicado (ex: "usuarios")
      const targetId = this.getAttribute("data-target");

      // 4. Remove a classe 'active' de TODOS os links para resetar o estado
      navLinks.forEach((navLink) => navLink.classList.remove("active"));

      // 5. Esconde TODAS as seções de conteúdo
      contentSections.forEach((section) => section.classList.remove("active"));

      // 6. Adiciona a classe 'active' APENAS ao link que foi clicado (para o destaque visual)
      this.classList.add("active");

      // 7. Mostra a seção de conteúdo correspondente ao link clicado
      document.getElementById(targetId).classList.add("active");
    });
  });
});
