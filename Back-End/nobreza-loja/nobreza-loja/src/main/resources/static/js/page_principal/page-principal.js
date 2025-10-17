// O estado do carrossel
let currentSlideIndex = 0;
const slides = document.querySelectorAll(".carousel-item");
const totalSlides = slides.length;
const banner = document.getElementById("banner");

// Função principal para exibir um slide, agora recebe a direção
function showSlide(index, direction = "next") {
  // Adicionamos 'direction' com valor padrão 'next'

  // Garante que o índice fique no loop
  if (index >= totalSlides) {
    currentSlideIndex = 0;
  } else if (index < 0) {
    currentSlideIndex = totalSlides - 1;
  } else {
    currentSlideIndex = index;
  }

  // 1. Remove classes ativas/de animação de TODOS os slides e seus textos
  slides.forEach((slide) => {
    slide.classList.remove("active");
    // Remove as classes de animação do main-text de TODOS os slides para limpar
    slide
      .querySelector(".main-text")
      .classList.remove("slide-in-right", "slide-in-left");
  });

  // 2. Mostra o novo slide e adiciona a classe 'active'
  const newSlide = slides[currentSlideIndex];
  newSlide.classList.add("active");

  // 3. Aplica a animação ao elemento de texto (.main-text) dentro do slide
  const textElement = newSlide.querySelector(".main-text");

  // Escolhe a animação baseada na direção
  if (direction === "next") {
    textElement.classList.add("slide-in-right");
  } else if (direction === "prev") {
    textElement.classList.add("slide-in-left");
  }

  // 4. Muda a imagem de fundo do #banner
  const newImage = newSlide.getAttribute("data-image");
  if (newImage) {
    // Aplica a nova imagem de fundo para acionar a transição CSS
    banner.style.backgroundImage = `url('${newImage}')`;
  }
}

// Funções de navegação (agora passando a direção)
function nextSlide() {
  showSlide(currentSlideIndex + 1, "next"); // Próximo slide: texto entra da direita (slide-in-right)
}

function prevSlide() {
  showSlide(currentSlideIndex - 1, "prev"); // Slide anterior: texto entra da esquerda (slide-in-left)
}

// Inicializa o carrossel (garante que o primeiro slide esteja ativo e com a imagem correta)
document.addEventListener("DOMContentLoaded", () => {
  showSlide(0); // Chamada inicial
});

// Seleciona os elementos do Subsearch
const searchTrigger = document.getElementById("search");
const subSearchHidden = document.getElementById("sub-search-hidden");
const searchInput = subSearchHidden.querySelector(".search-box");
const closeButton = document.querySelector("#close .button-search");

// Variável para armazenar o timer de fechamento
let closeTimer;

// Função para abrir a barra
function openSubSearch() {
  // Limpa o timer para garantir que a barra não feche imediatamente
  clearTimeout(closeTimer);
  subSearchHidden.classList.add("show-hidden");
}

// Função para iniciar o timer de fechamento
function startCloseTimer() {
  // Inicia um timer. Se o mouse voltar para a área antes do timer acabar, ele será limpo.
  closeTimer = setTimeout(() => {
    subSearchHidden.classList.remove("show-hidden");
  }, 150); // 150ms de tolerância
}

// 1. ABRIR: Mouse entra no botão 'Buscar'
searchTrigger.addEventListener("mouseover", openSubSearch);

// 2. MANTER ABERTO: Mouse entra na barra de pesquisa (limpa o timer iniciado pelo mouseout do #search)
subSearchHidden.addEventListener("mouseover", openSubSearch);

// 3. FECHAR: Mouse sai do botão 'Buscar' (Inicia o timer de fechamento)
searchTrigger.addEventListener("mouseout", startCloseTimer);

// 4. FECHAR: Mouse sai da barra de pesquisa (Inicia o timer de fechamento)
subSearchHidden.addEventListener("mouseout", startCloseTimer);

// 5. COMPORTAMENTO ADICIONAL: Focar no campo de busca ao abrir
searchTrigger.addEventListener("click", () => {
  openSubSearch();
  searchInput.focus(); // Foca no input somente no clique
});

// 6. DESATIVA O FECHAMENTO POR CLIQUE (Opcional, mas recomendado)
closeButton.addEventListener("click", (event) => {
  event.preventDefault();
  subSearchHidden.classList.remove("show-hidden"); // Fecha no clique do X
});

//MiniCarrinho
const cartIcon = document.getElementById("circle-cart");
const miniCart = document.getElementById("mini-cart");
// NOVO ELEMENTO SELECIONADO:
const closeCartButton = document.getElementById("mini-cart-close");

// Função para alternar a visibilidade do mini-carrinho (mantida)
function toggleMiniCart() {
  miniCart.classList.toggle("hidden");
}

// Função para fechar o mini-carrinho (Nova função específica)
function closeMiniCart() {
  miniCart.classList.add("hidden");
}

// Adiciona o evento de clique ao ícone do carrinho
cartIcon.addEventListener("click", toggleMiniCart);

// NOVO EVENTO: Fecha ao clicar no X
closeCartButton.addEventListener("click", closeMiniCart);

//Menu dos produtos
/// Seleciona os elementos
const productsMenuItem = document.getElementById("products");
const menuProductsHidden = document.getElementById("menu-products-hidden");
const productsLink = productsMenuItem.querySelector("a");

let closeTimerProducts;

// Função para abrir o menu e limpar o timer de fechar
function openProductsMenu() {
  clearTimeout(closeTimerProducts);
  menuProductsHidden.classList.add("show");
}

// Função para iniciar o timer de fechar
function startCloseTimerProducts() {
  // Inicia um timer. Se o mouse voltar, ele será cancelado.
  closeTimerProducts = setTimeout(() => {
    menuProductsHidden.classList.remove("show");
  }, 100); // 100ms de tolerância
}

// 1. ABRIR: Mouse entra no item "Produtos"
productsMenuItem.addEventListener("mouseover", openProductsMenu);

// 2. MANTER ABERTO: Mouse entra no submenu (limpa o timer iniciado pelo mouseout do item pai)
menuProductsHidden.addEventListener("mouseover", openProductsMenu);

// 3. FECHAR: Mouse sai do item "Produtos" (inicia o timer)
productsMenuItem.addEventListener("mouseout", startCloseTimerProducts);

// 4. FECHAR: Mouse sai do submenu (inicia o timer)
menuProductsHidden.addEventListener("mouseout", startCloseTimerProducts);

// 5. Previne a navegação no CLIQUE
productsLink.addEventListener("click", (event) => {
  event.preventDefault();
});
