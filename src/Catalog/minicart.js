const circleCart = document.getElementById("circle-cart");
const miniCart = document.getElementById("mini-cart");
const miniCartItems = document.getElementById("mini-cart-items");
const miniCartTotal = document.getElementById("mini-cart-total");

// Função para formatar valor em moeda brasileira
function formatarPreco(valor) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

// Função para renderizar os itens no mini carrinho
function renderMiniCart() {
  const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  miniCartItems.innerHTML = "";

  if (carrinho.length === 0) {
    miniCartItems.innerHTML = "<p>Seu carrinho está vazio.</p>";
    miniCartTotal.textContent = "Total: R$0,00";
    return;
  }

  let total = 0;

  carrinho.forEach((item, index) => {
    total += item.preco * item.quantidade;

    const itemDiv = document.createElement("div");
    itemDiv.className = "mini-cart-item";
    itemDiv.innerHTML = `
      <img src="${item.imagem}" alt="${item.nome}" class="mini-cart-img" />
      <div class="mini-cart-info">
        <p class="mini-cart-name">${item.nome}</p>
        <p>Tamanho: ${item.tamanho}</p>
        <p>Preço unitário: ${formatarPreco(item.preco)}</p>
        <div class="mini-cart-quantity">
          <button class="btn-quantidade" data-index="${index}" data-action="decrease">-</button>
          <span>${item.quantidade}</span>
          <button class="btn-quantidade" data-index="${index}" data-action="increase">+</button>
        </div>
      </div>
      <button class="btn-remover" data-index="${index}" title="Remover item">x</button>
    `;
    miniCartItems.appendChild(itemDiv);
  });

  miniCartTotal.textContent = `Total: ${formatarPreco(total)}`;

  // Eventos dos botões aumentar/diminuir e remover
  const btnQuantidade = miniCartItems.querySelectorAll(".btn-quantidade");
  btnQuantidade.forEach((btn) => {
    btn.addEventListener("click", () => {
      const idx = parseInt(btn.dataset.index);
      const action = btn.dataset.action;
      alterarQuantidade(idx, action);
    });
  });

  const btnRemover = miniCartItems.querySelectorAll(".btn-remover");
  btnRemover.forEach((btn) => {
    btn.addEventListener("click", () => {
      const idx = parseInt(btn.dataset.index);
      removerItem(idx);
    });
  });
}

// Função para alterar quantidade do item
function alterarQuantidade(index, action) {
  const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  if (!carrinho[index]) return;

  if (action === "increase") {
    carrinho[index].quantidade++;
  } else if (action === "decrease") {
    if (carrinho[index].quantidade > 1) {
      carrinho[index].quantidade--;
    } else {
      removerItem(index);
      return;
    }
  }
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  atualizarContadorCarrinho();
  renderMiniCart();
}

// Função para remover item
function removerItem(index) {
  const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  carrinho.splice(index, 1);
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  atualizarContadorCarrinho();
  renderMiniCart();
}

// Mostrar/ocultar mini carrinho ao clicar no carrinho
circleCart.addEventListener("click", (e) => {
  // Evitar fechar ao clicar dentro do mini cart
  if (e.target.closest("#mini-cart")) return;

  miniCart.classList.toggle("hidden");

  if (!miniCart.classList.contains("hidden")) {
    renderMiniCart();
  }
});

// Fechar o mini carrinho ao clicar fora dele
document.addEventListener("click", (e) => {
  const isClickInsideCart =
    e.target.closest("#circle-cart") || e.target.closest("#mini-cart");
  if (!isClickInsideCart) {
    miniCart.classList.add("hidden");
  }
});

//Evitar que o minicarrinho feche ao clicar no + ou no -
miniCart.addEventListener("click", (e) => {
  e.stopPropagation();
});

//Verificar se tem itens no carrinho

const btnFinalizarCompra = document.getElementById("mini-cart-checkout");
const customAlert = document.getElementById("custom-alert");
const alertMessage = document.getElementById("alert-message");
const alertOk = document.getElementById("alert-ok");

btnFinalizarCompra.addEventListener("click", () => {
  const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  if (carrinho.length === 0) {
    // Mostra alerta customizado
    mostrarAlerta("Não é possível finalizar a compra sem itens no carrinho.");
  } else {
    // Redireciona para a página de checkout
    window.location.href = "../Car-market/index.html";
  }
});

// Função para mostrar o alerta customizado
function mostrarAlerta(mensagem) {
  alertMessage.textContent = mensagem;
  customAlert.classList.remove("hidden");
}

// Fechar o alerta ao clicar no botão OK
alertOk.addEventListener("click", () => {
  customAlert.classList.add("hidden");
});
