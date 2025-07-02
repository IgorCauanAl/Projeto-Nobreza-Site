//Funcionamento do adicionar sacola
document.addEventListener("click", (e) => {
  const botao = e.target.closest("#btn-adicionar");
  if (!botao) return;

  const nome = botao.dataset.nome;
  const preco = parseFloat(botao.dataset.preco);
  const id = nome.toLowerCase().replace(/\s+/g, "-");

  const conjugate = botao.closest(".conjugate");
  const imagem = conjugate.querySelector("img").src;

  const tamanhoSelecionado = "P";

  const produto = {
    id,
    nome,
    preco,
    tamanho: tamanhoSelecionado,
    quantidade: 1,
    imagem,
  };

  adicionarAoCarrinho(produto);
  mostrarModal(produto);
});
