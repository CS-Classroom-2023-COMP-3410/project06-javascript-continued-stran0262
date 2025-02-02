let displayValue = ""; // Current display value
let memoryValue = "NaN"; // Memory recall value
let powerBase = null; // Stores the base number for power function
let isPowerOperation = false; // Flag to track power operation

// Get necessary elements
const resultInput = document.getElementById("result");
const buttons = document.querySelectorAll(".btn");
const clearButton = document.getElementById("clear");
const equalsButton = document.getElementById("equals");
const sqrtButton = document.getElementById("sqrt");
const percentButton = document.getElementById("percent");
const memoryRecallButton = document.getElementById("memory-recall");
const squareButton = document.getElementById("square");
const powerButton = document.getElementById("power");

// Update display
function updateDisplay(value) {
  resultInput.value = value || "0";
}

// Handle button clicks
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.getAttribute("data-value");

    if (value === "^") {
      if (displayValue !== "") {
        powerBase = displayValue; // Store the base number
        displayValue += "^"; // Add ^ symbol for power
        isPowerOperation = true; // Start power operation
        updateDisplay(displayValue); // Show base^ part
      }
    }  else if (value) {
      displayValue += value; // Add value to the display
      updateDisplay(displayValue);
    }
  });
});

// Clear the display and reset values
clearButton.addEventListener("click", () => {
  displayValue = "";
  powerBase = null;
  nthRootValue = null;
  isPowerOperation = false;
  updateDisplay("");
});

// Calculate and display the result
equalsButton.addEventListener("click", () => {
  try {
    if (displayValue.includes("/0")) {
      throw new Error("Error");
    }

    // Handle power function when exponent is provided
    if (isPowerOperation && powerBase !== null) {
      const exponent = parseFloat(displayValue.split("^")[1]); // Get exponent from display
      displayValue = Math.pow(parseFloat(powerBase), exponent).toString(); // Perform power calculation
      isPowerOperation = false; // Reset flag after calculation
      powerBase = null; // Reset base after calculation
    } 
    else {
      displayValue = eval(displayValue).toString(); // Regular evaluation
    }

    updateDisplay(displayValue); // Display the result
  } catch (error) {
    updateDisplay("Error");
    displayValue = "";
  }
});

// Square root function
sqrtButton.addEventListener("click", () => {
  try {
    const num = parseFloat(displayValue);
    if (num < 0) throw new Error("Error");
    displayValue = Math.sqrt(num).toString();
    updateDisplay(displayValue);
  } catch (error) {
    updateDisplay("Error");
    displayValue = "";
  }
});

// Percentage function
percentButton.addEventListener("click", () => {
  try {
    displayValue = (parseFloat(displayValue) / 100).toString();
    updateDisplay(displayValue);
  } catch (error) {
    updateDisplay("Error");
    displayValue = "";
  }
});

// Memory recall function
memoryRecallButton.addEventListener("click", () => {
  displayValue += memoryValue.toString();
  updateDisplay(displayValue);
});

// Update memory value when equals is clicked
equalsButton.addEventListener("click", () => {
  memoryValue = parseFloat(displayValue) || 0;
});

// Square function
squareButton.addEventListener("click", () => {
  try {
    const num = parseFloat(displayValue);
    displayValue = Math.pow(num, 2).toString();
    updateDisplay(displayValue);
  } catch (error) {
    updateDisplay("Error");
    displayValue = "";
  }
});