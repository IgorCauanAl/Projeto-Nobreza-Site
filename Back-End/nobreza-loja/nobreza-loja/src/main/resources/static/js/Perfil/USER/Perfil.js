// Aguarda o carregamento completo do conteúdo da página antes de executar o script
document.addEventListener("DOMContentLoaded", function () {
  // Seleciona todos os links de navegação da barra lateral
  const navLinks = document.querySelectorAll(".nav-link");

  // Seleciona todas as seções de conteúdo principal
  const contentSections = document.querySelectorAll(".content-section");

  // Adiciona um evento de clique para cada link de navegação
  navLinks.forEach((link) => {
    link.addEventListener("click", function (event) {
      // Impede o comportamento padrão do link (que é recarregar a página ou ir para uma âncora)
      event.preventDefault();

      // Pega o valor do atributo 'data-target' do link que foi clicado (ex: "pedidos")
      const targetId = this.getAttribute("data-target");

      // --- ETAPA DE RESET ---
      // Remove a classe 'active' de TODOS os links de navegação
      navLinks.forEach((navLink) => navLink.classList.remove("active"));
      // Remove a classe 'active' de TODAS as seções de conteúdo, escondendo-as
      contentSections.forEach((section) => section.classList.remove("active"));

      // --- ETAPA DE ATIVAÇÃO ---
      // Adiciona a classe 'active' APENAS ao link que foi clicado
      this.classList.add("active");
      // Encontra a seção de conteúdo com o ID correspondente e adiciona a classe 'active' para exibi-la
      document.getElementById(targetId).classList.add("active");
    });
  });
});
