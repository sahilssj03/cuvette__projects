const inputs = [...document.querySelectorAll("input[type='button']")]

function addToDisplay(value) {
  if (document.getElementById('display').value == '0') {
    document.getElementById('display').value = ''
    document.getElementById('display').classList.remove('special_class')
  }
  document.getElementById('display').value += value
}

function clearDisplay() {
  document.getElementById('display').value = 0
  document.getElementById('display').classList.add('special_class')
}

function clearLastInput() {
  let displayValue = document.getElementById('display').value
  displayValue = displayValue.slice(0, displayValue.length - 1) || ''
  if (displayValue === '') {
    document.getElementById('display').value = 0
    document.getElementById('display').classList.add('special_class')
    return
  }
  document.getElementById('display').value = displayValue
}

function calculate() {
  try {
    var displayValue = document.getElementById('display').value
    var result = eval(displayValue)
    if (result === Infinity || result === -Infinity) {
      document.getElementById('display').value = result
      throw new Error('Division by zero')
    }
  } catch (error) {
    if (error instanceof SyntaxError) {
      return
    } else {
      document.getElementById('display').value = displayValue
      return
    }
    // clearDisplay()
  }
  document.getElementById('display').value = result
}

inputs.forEach((input) => {
  input.addEventListener('click', function (e) {
    if (e.currentTarget.value.toLowerCase() == 'del') {
      clearLastInput()
    } else if (e.currentTarget.value.toLowerCase() == 'reset') {
      clearDisplay()
    } else if (e.currentTarget.value.toLowerCase() == '=') {
      calculate()
    } else {
      let value = e.currentTarget.value.toLowerCase()
      if (value == 'x') value = '*'
      addToDisplay(value)
    }
  })
})
