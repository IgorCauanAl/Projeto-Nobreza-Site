//Função para aparecer o front do ordenar
function renderOrdinationOptions() {
  const ordinationContainer = document.getElementById("ordination-container");

  if (ordinationContainer.style.display === "block") {
    ordinationContainer.style.display = "none";
    ordinationContainer.innerHTML = "";
    return;
  }

  let html = `<div id="ordination-panel">
        <p id="close-ordination">×</p>
        <h3>ORDENAR POR:</h3>
        <label><input type="radio" name="order" value="mais-vendidos"> Mais vendidos</label>
        <label><input type="radio" name="order" value="menor-preco"> Menor preço</label>
        <label><input type="radio" name="order" value="maior-preco"> Maior preço</label>
        <label><input type="radio" name="order" value="novidades"> Novidades</label>
        <button id="apply-ordination">Aplicar</button>
      </div>`;

  ordinationContainer.innerHTML = html;
  ordinationContainer.style.display = "block";

  document.getElementById("close-ordination").addEventListener("click", () => {
    ordinationContainer.style.display = "none";
    ordinationContainer.innerHTML = "";
  });

  document.getElementById("apply-ordination").addEventListener("click", () => {
    const selected = document.querySelector('input[name="order"]:checked');
    if (selected) {
      console.log("Ordenar por:", selected.value);
    }
    ordinationContainer.style.display = "none";
    ordinationContainer.innerHTML = "";
  });
}

document.getElementById("ordination").addEventListener("click", () => {
  renderOrdinationOptions();
});
