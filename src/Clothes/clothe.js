const boxNumbers = document.querySelectorAll(".selector-number");

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
