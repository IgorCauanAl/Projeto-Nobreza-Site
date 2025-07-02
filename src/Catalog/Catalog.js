//Banco de dados das categorias

const categories = {
  relogioClassico: {
    title: "Relógio Classico",
    breadcrumb: ["Inicio", "Produtos", "Relógio Classico"],
    products: [
      {
        image: "../fotos/shop_principal/MaisProcurados4.jpg",
        name: "Relógio Seiko",
        price: "R$ 3500",
        portion: "6x de R$ 584 sem juros",
      },

      {
        image: "../fotos/shop_principal/MaisProcurados4.jpg",
        name: "Relógio Seiko",
        price: "R$ 3500",
        portion: "6x de R$ 584 sem juros",
      },

      {
        image: "../fotos/shop_principal/MaisProcurados4.jpg",
        name: "Relógio Seiko",
        price: "R$ 3500",
        portion: "6x de R$ 584 sem juros",
      },

      {
        image: "../fotos/shop_principal/MaisProcurados4.jpg",
        name: "Relógio Seiko",
        price: "R$ 3500",
        portion: "6x de R$ 584 sem juros",
      },

      {
        image: "../fotos/shop_principal/MaisProcurados4.jpg",
        name: "Relógio Seiko",
        price: "R$ 3500",
        portion: "6x de R$ 584 sem juros",
      },

      {
        image: "../fotos/shop_principal/MaisProcurados4.jpg",
        name: "Relógio Seiko",
        price: "R$ 3500",
        portion: "6x de R$ 584 sem juros",
      },

      {
        image: "../fotos/shop_principal/MaisProcurados4.jpg",
        name: "Relógio Seiko",
        price: "R$ 3500",
        portion: "6x de R$ 584 sem juros",
      },

      {
        image: "../fotos/shop_principal/MaisProcurados4.jpg",
        name: "Relógio Seiko",
        price: "R$ 3500",
        portion: "6x de R$ 584 sem juros",
      },
    ],
  },

  sapatosOxFord: {
    title: "Sapatos OxFord",
    breadcrumb: ["Inicio", "Produtos", "Sapatos OxFord"],
    products: [
      {
        image: "../fotos/shop_principal/MaisProcurados2.jpg",
        name: "Sapatos OxFord",
        price: "R$ 2500",
        portion: "6x de R$ 417 sem juros",
      },

      {
        image: "../fotos/shop_principal/MaisProcurados2.jpg",
        name: "Sapatos OxFord",
        price: "R$ 2500",
        portion: "6x de R$ 417 sem juros",
      },

      {
        image: "../fotos/shop_principal/MaisProcurados2.jpg",
        name: "Sapatos OxFord",
        price: "R$ 2500",
        portion: "6x de R$ 417 sem juros",
      },

      {
        image: "../fotos/shop_principal/MaisProcurados2.jpg",
        name: "Sapatos OxFord",
        price: "R$ 2500",
        portion: "6x de R$ 417 sem juros",
      },

      {
        image: "../fotos/shop_principal/MaisProcurados2.jpg",
        name: "Sapatos OxFord",
        price: "R$ 2500",
        portion: "6x de R$ 417 sem juros",
      },

      {
        image: "../fotos/shop_principal/MaisProcurados2.jpg",
        name: "Sapatos OxFord",
        price: "R$ 2500",
        portion: "6x de R$ 417 sem juros",
      },

      {
        image: "../fotos/shop_principal/MaisProcurados2.jpg",
        name: "Sapatos OxFord",
        price: "R$ 2500",
        portion: "6x de R$ 417 sem juros",
      },

      {
        image: "../fotos/shop_principal/MaisProcurados2.jpg",
        name: "Sapatos OxFord",
        price: "R$ 2500",
        portion: "6x de R$ 417 sem juros",
      },
    ],
  },
};

//Função para pegar a categoria pela URL

function getCategorieURL() {
  const parms = new URLSearchParams(window.location.search);
  return parms.get("categories");
}

//Função para renderizar a página com os dados

function renderPage() {
  const currentCategorie = getCategorieURL();

  //Validação
  if (!categories.hasOwnProperty(currentCategorie)) {
    document.getElementById("catalog-container-grid").innerHTML =
      "<p>Categoria não encontrada.</p>";
    return;
  }

  const data = categories[currentCategorie];

  //Titulo Principal
  const title = document.querySelector("#text-title h2");
  if (title) title.textContent = data.title;

  //Breadcrumb
  const breadcrumbOl = document.querySelector("#breadcrumb ol");
  if (breadcrumbOl) {
    breadcrumbOl.innerHTML = ""; //Limpa
    data.breadcrumb.forEach((item) => {
      const li = document.createElement("li");
      li.innerHTML = `<a href="#">${item}</a>`;
      breadcrumbOl.appendChild(li);
    });
  }

  //Produtos
  const catalogDiv = document.getElementById("catalog");
  catalogDiv.innerHTML = "";

  data.products.forEach((products, i) => {
    const productsHTML = `
    <div class="conjugate">
        <img src="${products.image}" alt="${
      products.name
    }" class="img-catalog" />
        <div class="elemento-sobreposto">
         <div id="size">
          <p>P</p>
          <p>M</p>
          <p>G</p>
          <p>GG</p>
          <p>EG</p> 
         </div>
            
         <button data-nome="${products.name}"
          data-preco="${parseFloat(
            products.price.replace("R$", "").replace(",", ".")
          )}" id="btn-adicionar">Adicionar a sacola</button>
        </div>
        <div class="text-elements">
          <p>${products.name}</p>
          <p>${products.price}</p>
          <p>${products.portion}</p>
        </div>
      </div>
    `;

    catalogDiv.innerHTML += productsHTML;
  });

  //Texto de quantidade

  const resultText = document.querySelector("#result p");
  if (resultText) {
    resultText.textContent = `${date.products.length} products`;
  }
}

// Variáveis do Filtro
const filtersByCategory = {
  relogioClassico: {
    cor: ["Preto", "Prata", "Ouro"],
    coleção: ["Luxo", "Casual"],
  },
  sapatosOxFord: {
    tamanho: ["38", "39", "40", "41", "42"],
    cor: ["Preto", "Marrom"],
    material: ["Couro", "Camurça"],
  },
};

//Função para renderizar os filtros dinamicamente
function renderFilters() {
  const currentCategorie = getCategorieURL();
  const filtersContainer = document.getElementById("filter-container");
  filtersContainer.innerHTML = "";

  const filters = filtersByCategory[currentCategorie];

  if (!filters) return;

  let html = `<div id="filter-panel"><button id="close-filter">×</button>`;

  for (const [filtro, opcoes] of Object.entries(filters)) {
    html += `<div class="filter-group"><h3>${filtro.toUpperCase()}</h3>`;
    opcoes.forEach((opcao) => {
      html += `
        <label>
          <input type="checkbox" name="${filtro}" value="${opcao}" />
          ${opcao}
        </label>`;
    });
    html += `</div>`;
  }

  html += `<button id="apply-filters">Ver Resultados</button></div>`;
  filtersContainer.innerHTML = html;

  // Evento para fechar
  document.getElementById("close-filter").addEventListener("click", () => {
    const container = document.getElementById("filter-container");
    container.style.display = "none";
    container.innerHTML = "";
  });
}

// Mostrar/ocultar ao clicar no botão filtrar
document.getElementById("filter").addEventListener("click", () => {
  const container = document.getElementById("filter-container");
  if (container.style.display === "none" || container.style.display === "") {
    renderFilters();
    container.style.display = "block";
  } else {
    container.style.display = "none";
    container.innerHTML = "";
  }
});

renderPage();
renderFilters();
