//Função para adicionar os itens no carrinho
function adicionarAoCarrinho(produto) {
  const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

  const existente = carrinho.find(
    (item) => item.id === produto.id && item.tamanho === produto.tamanho
  );

  if (existente) {
    existente.quantidade += 1;
  } else {
    carrinho.push(produto);
  }

  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  atualizarContadorCarrinho();
  console.log("Produto adicionado:", produto);
}

//Função para amostrar o modal
function mostrarModal(produto) {
  document.getElementById("modal-img").src = produto.imagem;
  document.getElementById("modal-nome").textContent = produto.nome;
  document.getElementById("modal-tamanho").textContent =
    "Tamanho: " + produto.tamanho;
  document.getElementById("modal-carrinho").classList.remove("hidden");

  setTimeout(() => {
    document.getElementById("modal-carrinho").classList.add("hidden");
  }, 3000);
}

function fecharModal() {
  document.getElementById("modal-carrinho").classList.add("hidden");
}

//Atualizar o contador do carrinho
function atualizarContadorCarrinho() {
  const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  const totalItens = carrinho.reduce((soma, item) => soma + item.quantidade, 0);
  document.querySelector("#number-purchases p").textContent = totalItens;
}

document.addEventListener("DOMContentLoaded", atualizarContadorCarrinho);
