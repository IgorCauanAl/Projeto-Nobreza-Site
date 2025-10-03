document.addEventListener("DOMContentLoaded", () => {
  // 1. Seleciona todos os cabeçalhos do acordeão (os títulos clicáveis)
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
