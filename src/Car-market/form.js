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

//Código para aumentar a quantidade ou diminuir
const boxNumbers = document.querySelectorAll(".box-number");

boxNumbers.forEach((boxNumber) => {
  const number = boxNumber.querySelector(".number");
  const buttons = boxNumber.querySelectorAll(".selector");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      let currentValue = parseInt(number.textContent);

      if (button.textContent === "+") {
        number.textContent = currentValue + 1;
      } else if (button.textContent === "-" && currentValue > 1) {
        number.textContent = currentValue - 1;
      }
    });
  });
});
