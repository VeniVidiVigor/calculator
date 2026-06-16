const display = document.querySelector('.calc-container-input')
const buttons = document.querySelectorAll('button')
const digits = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']
const operators = ['+', '-', '×', '÷', '%', '=']
const specialButtons = ['⌫', 'AC', '±', ',']

buttons.forEach(button => {
  const value = button.textContent;
  button.addEventListener('click', () => {
    console.log(value)
    if (specialButtons.includes(value)) {
      console.log('Здесь спец.символ')
      if (value === 'AC') {
        display.value = ""
      } else if (value === '⌫') {
        display.value = display.value.slice(0, -1)
      }
    } else if (operators.includes(value)) {
      console.log('Здесь оператор')
      if (display.value === "") {
        alert('Сначала цифра')
      } else if (operators.includes(display.value.at(-1))) {
        console.log(`Меняю на другого оператора ${value}`)
        display.value = display.value.slice(0, -1) + value
      } else {
        display.value += value
      }
    } else {
      display.value += value
    }
  })
})

console.log("Оно дышит")