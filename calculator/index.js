let currentInput = "0";
let previousInput = "";
let operator = "";
let shouldResetScreen = false;

const screen = document.getElementById("screen");

function updateScreen() {
  screen.textContent = currentInput;
}

function appendNumber(num) {
  if (shouldResetScreen) {
    currentInput = num;
    shouldResetScreen = false;
  } else {
    currentInput = currentInput === "0" ? num : currentInput + num;
  }
  updateScreen();
}

function appendDecimal() {
  if (shouldResetScreen) {
    currentInput = "0.";
    shouldResetScreen = false;
  } else if (!currentInput.includes(".")) {
    currentInput += ".";
  }
  updateScreen();
}

function appendOperator(op) {
  if (operator && !shouldResetScreen) {
    calculate();
  }
  previousInput = currentInput;
  operator = op;
  shouldResetScreen = true;
}

function calculate() {
  if (!operator || shouldResetScreen) return;

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
  shouldResetScreen = true;
  updateScreen();
}

function clearScreen() {
  currentInput = "0";
  previousInput = "";
  operator = "";
  shouldResetScreen = false;
  updateScreen();
}

function deleteLastChar() {
  if (currentInput.length > 1) {
    currentInput = currentInput.slice(0, -1);
  } else {
    currentInput = "0";
  }
  updateScreen();
}

// Keyboard support
document.addEventListener("keydown", (e) => {
  if (e.key >= "0" && e.key <= "9") appendNumber(e.key);
  if (e.key === ".") appendDecimal();
  if (e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/")
    appendOperator(e.key);
  if (e.key === "Enter" || e.key === "=") calculate();
  if (e.key === "Escape") clearScreen();
  if (e.key === "Backspace") deleteLastChar();
});
