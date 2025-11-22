
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


const productsMostWanted = document.querySelectorAll(".product");
const titleMosWanted = document.querySelectorAll(".title-mostwanted");


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
