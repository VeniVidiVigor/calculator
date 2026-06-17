const display = document.querySelector(".calc-container-input");
const buttons = document.querySelectorAll("button");
const operators = ["+", "-", "×", "÷", "%"];
const specialButtons = ["⌫", "AC", "±", ","];

buttons.forEach((button) => {
  const value = button.textContent;
  button.addEventListener("click", () => {
    console.log(value);
    if (specialButtons.includes(value)) { // обработка спец.кнопок
      console.log("Здесь спец.символ");
      if (value === "AC") {
        display.value = "";
      } else if (value === "⌫") {
        display.value = display.value.slice(0, -1);
      }
    } else if (operators.includes(value)) { // обработка математических операторов
      console.log("Здесь оператор");
      if (display.value === "") {
        alert("Сначала цифра");
      } else if (operators.includes(display.value.at(-1))) {
        console.log(`Меняю на другого оператора ${value}`);
        display.value = display.value.slice(0, -1) + value;
      } else {
        display.value += value;
      }
    } else if (value === "=") { // обработка вычисления
      if (operators.includes(display.value.at(-1))) {
        return // просто вернуть без изменений
      }
      const expression = replaceMathSymbols(display.value)
      console.log(expression)
      display.value = "выполнено действие"; //@todo
    } else {
      display.value += value
    }
  });
});

function calculate() {
  // вычисление
}

function replaceMathSymbols(value) {
  const replaceSymbols = value
    .replaceAll('×', '*')
    .replaceAll('÷', '/');
  return replaceSymbols
}
