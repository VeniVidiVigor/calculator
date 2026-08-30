const display = document.querySelector(".calc-container-input");
const buttons = document.querySelectorAll("button");
const operators = ["+", "-", "×", "÷"];
const specialButtons = ["⌫", "AC", "±", ",", "%"];

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
      } else if (value === "%") {
        if (display.value === "" || operators.includes(display.value.at(-1))) {
          return;
        }

        const match = display.value.match(
          /(\d+[.,]?\d*)([+\-×÷])(\d+[.,]?\d*)$/,
        );

        let percentValue;
        let beforeLastNumber;

        if (match) {
          const firstOperand = parseFloat(match[1].replace(",", "."));
          const operator = match[2];
          const lastNumber = parseFloat(match[3].replace(",", "."));

          if (operator === "+" || operator === "-") {
            percentValue = (firstOperand * lastNumber) / 100;
          } else {
            percentValue = lastNumber / 100;
          }
          beforeLastNumber = display.value.slice(
            0,
            display.value.length - match[3].length,
          );
        } else {
          const lastNumber = display.value.split(/[+\-×÷%]/).at(-1);
          percentValue = parseFloat(lastNumber.replace(",", ".")) / 100;
          beforeLastNumber = display.value.slice(
            0,
            display.value.length - lastNumber.length,
          );
        }

        display.value =
          beforeLastNumber + String(percentValue).replace(".", ",");
      } else if (value === "±") {
        if (display.value === "") {
          display.value = "-";
          return;
        }

        const match = display.value.match(/(-?\d+[.,]?\d*)$/);
        if (!match) return;

        let lastNumber = match[0];
        let start = match.index;

        if (lastNumber.startsWith("-")) {
          const charBeforeMinus = display.value[start - 1];
          if (
            charBeforeMinus !== undefined &&
            !operators.includes(charBeforeMinus)
          ) {
            lastNumber = lastNumber.slice(1);
            start += 1;
          }
        }

        const before = display.value.slice(0, start);

        if (lastNumber.startsWith("-")) {
          display.value = before + lastNumber.slice(1);
        } else {
          display.value = before + "-" + lastNumber;
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
        let fixed = result.toFixed(12);
        while (fixed.at(-1) === "0") {
          fixed = fixed.slice(0, -1);
        }
        if (fixed.at(-1) === ".") {
          fixed = fixed.slice(0, -1);
        }
        display.value = fixed;
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
    const normalized = normalizeSigns(expression);
    const result = eval(normalized);
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

function normalizeSigns(expression) {
  let result = expression;
  let previous;
  do {
    previous = result;
    result = result
      .replace(/--/g, "+")
      .replace(/\+-/g, "-")
      .replace(/-\+/g, "-")
      .replace(/\+\+/g, "+");
  } while (result !== previous);
  return result;
}
