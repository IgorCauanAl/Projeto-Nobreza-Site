//Aparece o formulario do cartao ao clicar
const radioCard = document.getElementById("radio-card");
const formCard = document.getElementById("form-card");

radioCard.addEventListener("change", () => {
  if (radioCard.checked) {
    formCard.classList.add("show");
  } else {
    formCard.classList.remove("show");
  }
});

  document.getElementById("pay-now").addEventListener("click", () => {
      window.location.href = "../Purchase_closing_page/index.html";
  });

