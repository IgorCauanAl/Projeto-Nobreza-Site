document.addEventListener("DOMContentLoaded", () => {
  let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  const container = document.getElementById("primary-rectangle");

  carrinho.forEach((produto, index) => {
    const div = document.createElement("div");
    div.className = "rectangle_secundary_dynamic";
    div.innerHTML = `
      <img class="img_rectangle_secundary_dynamic" src="${produto.imagem}" />
      <div class="text-item-dynamic">
        <p>${produto.nome}</p>
        <p>Ref: ${produto.id.toUpperCase()}</p>
        <p>Tamanho:${produto.tamanho}</p>
      </div>
      <div id="selector-number-dynamic">
        <div class="title-quantity-dynamic"><p>Quantidade</p></div>
        <div class="box-number-dynamic" data-index="${index}">
          <p class="selector-dynamic">-</p>
          <p class="selector number-dynamic">${produto.quantidade}</p>
          <p class="selector-dynamic">+</p>
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

  function atualizarTotal() {
    carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    const total = carrinho.reduce(
      (soma, item) => soma + item.preco * item.quantidade,
      0
    );
    document.getElementById("total").innerHTML = `
      <p>Total: R$${total.toFixed(2).replace(".", ",")}</p>
      <p>Frete: Grátis</p>
    `;
  }

  const boxNumbers = document.querySelectorAll(".box-number-dynamic");

  boxNumbers.forEach((boxNumber) => {
    const number = boxNumber.querySelector(".number-dynamic");
    const buttons = boxNumber.querySelectorAll(".selector-dynamic");
    const index = parseInt(boxNumber.getAttribute("data-index"));

    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        let currentValue = parseInt(number.textContent);
        let novoValor = currentValue;

        if (button.textContent === "+") {
          novoValor = currentValue + 1;
        } else if (button.textContent === "-" && currentValue > 1) {
          novoValor = currentValue - 1;
        }

        // Atualiza visualmente
        number.textContent = novoValor;

        // Atualiza localStorage
        const carrinhoAtualizado =
          JSON.parse(localStorage.getItem("carrinho")) || [];
        if (carrinhoAtualizado[index]) {
          carrinhoAtualizado[index].quantidade = novoValor;
          localStorage.setItem("carrinho", JSON.stringify(carrinhoAtualizado));
        }

        // Atualiza total
        atualizarTotal();
      });
    });
  });

  // Atualiza total ao carregar
  atualizarTotal();
});
