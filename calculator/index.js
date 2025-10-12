let currentInput = "0";
let previousInput = "";
let operator = "";
let shouldResetDisplay = false;

const display = document.getElementById("display");

function updateDisplay() {
  display.textContent = currentInput;
}

function appendNumber(num) {
  if (shouldResetDisplay) {
    currentInput = num;
    shouldResetDisplay = false;
  } else {
    currentInput = currentInput === "0" ? num : currentInput + num;
  }
  updateDisplay();
}

function appendDecimal() {
  if (shouldResetDisplay) {
    currentInput = "0.";
    shouldResetDisplay = false;
  } else if (!currentInput.includes(".")) {
    currentInput += ".";
  }
  updateDisplay();
}

function appendOperator(op) {
  if (operator && !shouldResetDisplay) {
    calculate();
  }
  previousInput = currentInput;
  operator = op;
  shouldResetDisplay = true;
}

function calculate() {
  if (!operator || shouldResetDisplay) return;

  const prev = parseFloat(previousInput);
  const curr = parseFloat(currentInput);
  let result;

  switch (operator) {
    case "+":
      result = prev + curr;
      break;
    case "-":
      result = prev - curr;
      break;
    case "*":
      result = prev * curr;
      break;
    case "/":
      result = curr !== 0 ? prev / curr : "Error";
      break;
    default:
      return;
  }

  currentInput = result.toString();
  operator = "";
  previousInput = "";
  shouldResetDisplay = true;
  updateDisplay();
}

function clearDisplay() {
  currentInput = "0";
  previousInput = "";
  operator = "";
  shouldResetDisplay = false;
  updateDisplay();
}

function deleteLastChar() {
  if (currentInput.length > 1) {
    currentInput = currentInput.slice(0, -1);
  } else {
    currentInput = "0";
  }
  updateDisplay();
}

// Keyboard support
document.addEventListener("keydown", (e) => {
  if (e.key >= "0" && e.key <= "9") appendNumber(e.key);
  if (e.key === ".") appendDecimal();
  if (e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/")
    appendOperator(e.key);
  if (e.key === "Enter" || e.key === "=") calculate();
  if (e.key === "Escape") clearDisplay();
  if (e.key === "Backspace") deleteLastChar();
});
