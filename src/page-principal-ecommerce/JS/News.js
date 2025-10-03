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
