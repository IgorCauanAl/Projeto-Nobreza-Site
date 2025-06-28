//Funcionalidade da busca
const products = document.getElementById("products");
const menu = document.getElementById("menu-products-hidden");
let timeout;

products.addEventListener("mouseenter", () => {
  menu.classList.add("show");
});

products.addEventListener("mouseleave", () => {
  timeout = setTimeout(() => {
    if (!menu.matches(":hover")) {
      menu.classList.remove("show");
    }
  }, 100);
});

menu.addEventListener("mouseenter", () => {
  clearTimeout(timeout);
  menu.classList.add("show");
});

menu.addEventListener("mouseleave", () => {
  timeout = setTimeout(() => {
    if (!products.matches(":hover")) {
      menu.classList.remove("show");
    }
  }, 100);
});

const search = document.getElementById("button-search");
const menu_search = document.getElementById("sub-search-hidden");

search.addEventListener("click", () => {
  menu_search.classList.add("show-hidden");
});

search.addEventListener("mouseleave", () => {
  timeout = setTimeout(() => {
    if (!menu_search.matches(":hover") && !search.matches(":hover")) {
      menu_search.classList.remove("show-hidden");
    }
  }, 100);
});

menu_search.addEventListener("click", () => {
  clearTimeout(timeout);
  search.classList.add("show-hidden");
});

menu_search.addEventListener("mouseleave", () => {
  timeout = setTimeout(() => {
    if (!menu.matches(":hover")) {
      menu_search.classList.remove("show-hidden");
    }
  }, 100);
});
//Encerramento da busca

//Carrossel do banner principal
//Imagens que vão ser passadas do banner
const slides = [
  {
    title: "NOVA COLEÇÃO",
    subtitle: "Blazer Moderno",
    image: "url('../fotos/shop_principal/bannerprincipalshop.jpg')",
  },
  {
    title: "OUTONO 2025",
    subtitle: "Blazer Inglês",
    image: "url('../fotos/shop_principal/bannerprincipalshop.jpg')",
  },
  {
    title: "EDIÇÃO LIMITADA",
    subtitle: "Blazer Britânico",
    image: "url('../fotos/shop_principal/bannerprincipalshop.jpg')",
  },
];

//Selecionando os elementos DOOM do banner
const banner = document.getElementById("banner");
const titlePrin = document.querySelector("#secundary-text h2");
const subtitle = document.querySelector("#secundary-text h3");
const leftArrow = document.querySelector(".left-arrow");
const rightArrow = document.querySelector(".right-arrow");

//Variável de Controle
let indiceAtual = 0;

//Função para trocar a imagem
function updateBanner() {
  const slide = slides[indiceAtual];
  banner.style.backgroundImage = slide.image;
  titlePrin.textContent = slide.title;
  subtitle.textContent = slide.subtitle;
}

rightArrow.addEventListener("click", () => {
  indiceAtual = (indiceAtual + 1) % slides.length;
  updateBanner();
});

leftArrow.addEventListener("click", () => {
  indiceAtual = (indiceAtual - 1 + slides.length) % slides.length;
  updateBanner();
});

updateBanner();
//Encerramento da passagem do banner

//Carrossel em categorias
const slidesCategories = [
  {
    image: [
      "../fotos/shop_principal/categorias(1).jpg",
      "../fotos/shop_principal/Categorias.jpg",
      "../fotos/shop_principal/Categorias2.jpg",
    ],
    title: "Ternos",
  },

  {
    image: [
      "../fotos/shop_principal/Categorias2.jpg",
      "../fotos/shop_principal/Categorias2.jpg",
      "../fotos/shop_principal/Categorias2.jpg",
    ],
    title: "Relógios",
  },

  {
    image: [
      "../fotos/shop_principal/Categorias.jpg",
      "../fotos/shop_principal/Categorias.jpg",
      "../fotos/shop_principal/Categorias.jpg",
    ],
    title: "Sapatos",
  },
];

//Selecionamento os elementos no DOOM
const img1 = document.getElementById("img1");
const img2 = document.getElementById("img2");
const img3 = document.getElementById("img3");

const types = document.getElementById("type-of-clothes");
const bolinhas = document.querySelectorAll(".little-ball");

//Função para mudar as imagens
function updateCategorie(index) {
  img1.src = slidesCategories[index].image[0];
  img2.src = slidesCategories[index].image[1];
  img3.src = slidesCategories[index].image[2];

  //Mudar o titulo
  types.textContent = slidesCategories[index].title;
}
//Mudar as imagens com as bolinhas
bolinhas.forEach((bolinha, index) => {
  bolinha.addEventListener("click", () => {
    updateCategorie(index);
  });
});

//Fixar o primeiro grupo de imagens no inicio
updateCategorie(0);

//Carrossel para os mais procurados
const slideMostWanted = [
  [
    {
      title: "Paletó Classico Armani",
      price: "R$1200",
      image: "../fotos/shop_principal/MaisProcurados3.jpg",
    },

    {
      title: "Sapato Social Louie",
      price: "R$1100",
      image: "../fotos/shop_principal/MaisProcurados2.jpg",
    },

    {
      title: "Blazer Verde Listado Zegna",
      price: "R$5400",
      image: "../fotos/shop_principal/Maisprocurados.jpg",
    },

    {
      title: "Relógio Seiko Classico",
      price: "R$1900",
      image: "../fotos/shop_principal/MaisProcurados4.jpg",
    },
  ],
  [
    {
      title: "Relógio Seiko Classico",
      price: "R$4000",
      image: "../fotos/shop_principal/MaisProcurados3.jpg",
    },

    {
      title: "Relógio Seiko Classico",
      price: "R$4000",
      image: "../fotos/shop_principal/MaisProcurados3.jpg",
    },

    {
      title: "Relógio Seiko Classico",
      price: "R$4000",
      image: "../fotos/shop_principal/MaisProcurados3.jpg",
    },

    {
      title: "Relógio Seiko Classico",
      price: "R$4000",
      image: "../fotos/shop_principal/MaisProcurados3.jpg",
    },
  ],

  [
    {
      title: "Sapato Social Louie",
      price: "R$5000",
      image: "../fotos/shop_principal/MaisProcurados3.jpg",
    },

    {
      title: "Sapato Social Louie",
      price: "R$5000",
      image: "../fotos/shop_principal/MaisProcurados3.jpg",
    },

    {
      title: "Sapato Social Louie",
      price: "R$5000",
      image: "../fotos/shop_principal/MaisProcurados3.jpg",
    },

    {
      title: "Sapato Social Louie",
      price: "R$5000",
      image: "../fotos/shop_principal/MaisProcurados3.jpg",
    },
  ],
];

//Selecionando os elementos DOOM de mais procurados
const productsMostWanted = document.querySelectorAll(".product");
const titleMosWanted = document.querySelectorAll(".title-mostwanted");

//Variável de controle
let indexMostWanted = 0;

//Função para mudar as imagens dos mais procurados
function updateMostWanted() {
  const group = slideMostWanted[indexMostWanted];

  group.forEach((products, i) => {
    productsMostWanted[i].style.backgroundImage = `url(${products.image})`;
    productsMostWanted[i].querySelector("h2").textContent = products.title;
    productsMostWanted[i].querySelector("p").textContent = products.price;
  });
}

document
  .querySelectorAll(".elements-navigation-mostwanted .little-ball")

  .forEach((b, i) => {
    b.addEventListener("click", () => {
      indexMostWanted = i;
      updateMostWanted();
    });
  });
//Encerramento carrosel mais procurados

//Carrossel para novidades
const groupNews = [
  [
    {
      image: "../fotos/shop_principal/Novidades4.jpg",
      title: "Paletó Classico Bege Armani",
      price: "R$1200",
    },

    {
      image: "../fotos/shop_principal/Novidades3.jpg",
      title: "Paletó Classico Bege Armani",
      price: "R$1200",
    },

    {
      image: "../fotos/shop_principal/Novidades.jpg",
      title: "Paletó Classico Bege Armani",
      price: "R$1200",
    },

    {
      image: "../fotos/shop_principal/ternoazul.jpg",
      title: "Paletó Classico Bege Armani",
      price: "R$1200",
    },

    {
      image: "../fotos/shop_principal/Novidades2.jpg",
      title: "Paletó Classico Bege Armani",
      price: "R$1200",
    },
  ],

  [
    {
      image: "../fotos/shop_principal/Novidades2.jpg",
      title: "Paletó Classico Bege Armani",
      price: "R$1200",
    },

    {
      image: "../fotos/shop_principal/Novidades2.jpg",
      title: "Paletó Classico Bege Armani",
      price: "R$1200",
    },

    {
      image: "../fotos/shop_principal/Novidades2.jpg",
      title: "Paletó Classico Bege Armani",
      price: "R$1200",
    },

    {
      image: "../fotos/shop_principal/Novidades2.jpg",
      title: "Paletó Classico Bege Armani",
      price: "R$1200",
    },

    {
      image: "../fotos/shop_principal/Novidades2.jpg",
      title: "Paletó Classico Bege Armani",
      price: "R$1200",
    },
  ],

  [
    {
      image: "../fotos/shop_principal/Novidades4.jpg",
      title: "Paletó Classico Bege Armani",
      price: "R$1200",
    },

    {
      image: "../fotos/shop_principal/Novidades4.jpg",
      title: "Paletó Classico Bege Armani",
      price: "R$1200",
    },

    {
      image: "../fotos/shop_principal/Novidades4.jpg",
      title: "Paletó Classico Bege Armani",
      price: "R$1200",
    },

    {
      image: "../fotos/shop_principal/Novidades4.jpg",
      title: "Paletó Classico Bege Armani",
      price: "R$1200",
    },

    {
      image: "../fotos/shop_principal/Novidades4.jpg",
      title: "Paletó Classico Bege Armani",
      price: "R$1200",
    },
  ],
];

//Variável para selecionar os elementos DOOM de news
const imageNews = document.querySelectorAll(".photo");
const titleNews = document.querySelectorAll(".description-news");

//Variável de Controle
let indexNews = 0;

function updateNews() {
  const group = groupNews[indexNews];

  group.forEach((news, i) => {
    imageNews[i].style.backgroundImage = `url(${news.image})`;
    const price_title = titleNews[i].querySelectorAll("p");
    price_title[0].textContent = news.title;
    price_title[1].textContent = news.price;
  });
}

document
  .querySelectorAll(".elements-navigation-news .little-ball")

  .forEach((b, i) => {
    b.addEventListener("click", () => {
      indexNews = i;
      updateNews();
    });
  });

updateNews();
