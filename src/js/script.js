const display = document.querySelector(".calc-container-input");
const buttons = document.querySelectorAll("button");
const operators = ["+", "-", "×", "÷", "%"];
const specialButtons = ["⌫", "AC", "±", ","];

buttons.forEach((button) => {
  const value = button.textContent;
  button.addEventListener("click", () => {
    console.log(value);
    if (specialButtons.includes(value)) {
      // обработка спец.кнопок
      if (value === "AC") {
        display.value = "";
      } else if (value === "⌫") {
        display.value = display.value.slice(0, -1);
      } else if (value === ",") {
        if (
          display.value
            .split(/[+\-×÷%]/)
            .at(-1)
            .includes(",") ||
          operators.includes(display.value.at(-1)) ||
          display.value === ""
        ) {
          return;
        } else {
          display.value += ",";
        }
      }
    } else if (operators.includes(value)) {
      // обработка математических операторов
      if (display.value === "") {
        alert("Сначала цифра");
      } else if (operators.includes(display.value.at(-1))) {
        console.log(`Меняю на другого оператора ${value}`);
        display.value = display.value.slice(0, -1) + value;
      } else {
        display.value += value;
      }
    } else if (value === "=") {
      // обработка вычисления
      if (operators.includes(display.value.at(-1)) || display.value === "") {
        return;
      }
      const expression = replaceMathSymbols(display.value);
      const result = calculate(expression);
      if (String(result).includes(".")) {
        display.value = result.toFixed(2);
      } else {
        display.value = result;
      }
    } else {
      display.value += value;
    }
  });
});

function calculate(expression) {
  try {
    const result = eval(expression);
    if (!Number.isFinite(result)) {
      return "Нельзя делить на ноль";
    } else {
      return result;
    }
  } catch (error) {
    return "Error";
  }
}

function replaceMathSymbols(value) {
  const replaceSymbols = value
    .replaceAll("×", "*")
    .replaceAll("÷", "/")
    .replaceAll(",", ".");
  return replaceSymbols;
}
