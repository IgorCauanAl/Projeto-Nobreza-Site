  document.addEventListener("DOMContentLoaded", () => {
    const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    const container = document.getElementById("primary-rectangle");
    const totalContainer = document.getElementById("total");

    // Renderiza produtos
    carrinho.forEach(produto => {
      const div = document.createElement("div");
      div.className = "rectangle_secundary_dynamic";
      div.innerHTML = `
        <img class="img_rectangle_secundary_dynamic" src="${produto.imagem}" />
        <div class="text-item-dynamic">
          <p>${produto.nome}</p>
          <p>Ref: ${produto.id.toUpperCase()}</p>
          <p>Tamanho: ${produto.tamanho}</p>
        </div>
        <div id="selector-number-dynamic">
          <div class="title-quantity"><p>Quantidade</p></div>
          <div class="box-number-dynamic">
            <p class="number-dynamic">${produto.quantidade}</p>
          </div>
        </div>
        <div class="text-right-dynamic">
          <p>Valor</p>
          <p>R$${produto.preco}</p>
          <p>No Pix</p>
        </div>
      `;
      container.appendChild(div);
    });

    // Calcula total
    const total = carrinho.reduce(
      (acc, item) => acc + item.preco * item.quantidade,
      0
    );

    // Exibe total
    totalContainer.innerHTML = `
      <p>Total: R$${total.toFixed(2).replace(".", ",")}</p>
      <p>Frete: Grátis</p>
    `;
  });