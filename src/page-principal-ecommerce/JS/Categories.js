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
