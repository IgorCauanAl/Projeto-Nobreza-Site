
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
