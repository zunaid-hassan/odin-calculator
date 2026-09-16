const lg = console.log;

function add(firstNumber, secondNumber) {
  return firstNumber + secondNumber;
}

function subtract(firstNumber, secondNumber) {
  return firstNumber - secondNumber;
}

function multiply(firstNumber, secondNumber) {
  return parseFloat((firstNumber * secondNumber).toFixed(6));
}

function divide(firstNumber, secondNumber) {
  if (secondNumber === 0) {
    return "Nice try!";
  }
  return parseFloat((firstNumber / secondNumber).toFixed(6));
}

function operate(operatorStr, firstNumberStr, secondNumberStr) {
  let firstNumber = parseFloat(firstNumberStr);
  let secondNumber = parseFloat(secondNumberStr);

  if (operatorStr === "+") {
    return add(firstNumber, secondNumber);
  } else if (operatorStr === "-") {
    return subtract(firstNumber, secondNumber);
  } else if (operatorStr === "*") {
    return multiply(firstNumber, secondNumber);
  } else {
    return divide(firstNumber, secondNumber);
  }
}

const btnContainer = document.querySelector("#buttons-container");

const display = document.querySelector("#display");

// function btnInteraction(event) {
//   if (event.target.tagName !== "BUTTON") {
//     return;
//   }

//   if (event.target.id !== "allClearBtn" && event.target.id !== "delBtn") {
//     const text = document.createElement("span");
//     text.classList = "display-digit";
//     text.textContent = event.target.textContent;
//     display.appendChild(text);
//     // lg(display.innerHTML);
//   }
// }
let firstNumberStr = "";
let secondNumberStr = "";
let operatorStr = "";

function btnInteraction(event) {
  const target = event.target;
  const targetValue = event.target.value;
  const targetText = event.target.textContent;

  if (event.target.tagName !== "BUTTON") {
    return;
  }

  if (event.target.id === "allClearBtn" || event.target.id === "delBtn") {
    return;
  }

  if (firstNumberStr === "" && operatorStr === "" && secondNumberStr === "") {
    if ("0123456789-".includes(targetValue)) {
      firstNumberStr += targetValue;

      updateDisplay();
    } else if (targetValue === "." && !firstNumberStr.includes(".")) {
      firstNumberStr += targetValue;

      updateDisplay();
    } else if ("*+/".includes(targetValue)) {
      return;
    }
  } else if (
    firstNumberStr !== "" &&
    operatorStr === "" &&
    secondNumberStr === ""
  ) {
    if ("0123456789".includes(targetValue)) {
      firstNumberStr += targetValue;

      updateDisplay();
    } else if (targetValue === "." && !firstNumberStr.includes(".")) {
      firstNumberStr += targetValue;

      updateDisplay();
    } else if ("-*+/".includes(targetValue) && firstNumberStr === ".") {
      return;
    } else if ("-*+/".includes(targetValue)) {
      operatorStr = targetValue;

      updateDisplay();
    }
  } else if (
    firstNumberStr !== "" &&
    firstNumberStr !== "." &&
    operatorStr !== "" &&
    secondNumberStr === ""
  ) {
    if ("-*+/".includes(targetValue)) {
      operatorStr = targetValue;

      updateDisplay();
    } else if (targetValue === "." && !secondNumberStr.includes(".")) {
      secondNumberStr += targetValue;

      updateDisplay();
    } else if ("0123456789".includes(targetValue)) {
      secondNumberStr += targetValue;

      updateDisplay();
    }
  } else {
    if ("0123456789".includes(targetValue)) {
      secondNumberStr += targetValue;

      updateDisplay();
    } else if (targetValue === "." && !secondNumberStr.includes(".")) {
      secondNumberStr += targetValue;

      updateDisplay();
    } else if (targetValue === "." && secondNumberStr.includes(".")) {
      return;
    } else if ("-*+/".includes(targetValue) && secondNumberStr === ".") {
      return;
    } else if ("-*+/".includes(targetValue)) {
      firstNumberStr = operate(
        operatorStr,
        firstNumberStr,
        secondNumberStr,
      ).toString();
      operatorStr = targetValue;
      secondNumberStr = "";
      updateDisplay();
    } else if (secondNumberStr !== "." && "=".includes(targetValue)) {
      firstNumberStr = operate(
        operatorStr,
        firstNumberStr,
        secondNumberStr,
      ).toString();

      operatorStr = "";
      secondNumberStr = "";

      updateDisplay();
    }
  }
  lg("---------------------");
  lg("firstNumberStr: " + firstNumberStr);
  lg("operatorStr: " + operatorStr);
  lg("secondNumberStr: " + secondNumberStr);
}

function updateDisplay() {
  while (display.firstChild) {
    display.removeChild(display.firstChild);
  }

  const firstDigit = document.createElement("span");
  firstDigit.classList = "first-digit";
  firstDigit.textContent = firstNumberStr;
  display.appendChild(firstDigit);

  const operatorDigit = document.createElement("span");
  operatorDigit.classList = "operator";
  if (operatorStr === "*") {
    operatorDigit.textContent = "×";
  } else if (operatorStr === "/") {
    operatorDigit.textContent = "÷";
  } else {
    operatorDigit.textContent = operatorStr;
  }
  display.appendChild(operatorDigit);

  const secondDigit = document.createElement("span");
  secondDigit.classList = "second-digit";
  secondDigit.textContent = secondNumberStr;
  display.appendChild(secondDigit);
}

function clearDisplay() {
  while (display.firstChild) {
    display.removeChild(display.firstChild);
  }
}

btnContainer.addEventListener("click", btnInteraction);

const acBtn = document.querySelector("#allClearBtn");

acBtn.addEventListener("click", () => {
  let display = document.getElementById("display");
  if (display.textContent.length > 0) {
    display.textContent = "";
  }
  firstNumberStr = "";
  secondNumberStr = "";
  operatorStr = "";

  lg("---------------------");
  lg("firstNumberStr: " + firstNumberStr);
  lg("operatorStr: " + operatorStr);
  lg("secondNumberStr: " + secondNumberStr);
});

const delBtn = document.querySelector("#delBtn");

delBtn.addEventListener("click", () => {
  let display = document.getElementById("display");
  if (display.lastElementChild) {
    // lg(display.lastElementChild);
    display.removeChild(display.lastElementChild);
  }
});

// const bodyTxt = document.querySelector("body");
// bodyTxt.addEventListener("keydown", (event) => {
//   if (!Number.isNaN(parseInt(event.key))) {
//     lg(`You pressed "${event.key}".`);
//     const text = document.createElement("span");
//     text.classList = "display-digit";
//     text.textContent = event.key;
//     display.appendChild(text);
//   }
// });

const bodyTxt = document.querySelector("body");
bodyTxt.addEventListener("keydown", (event) => {
  if ("0123456789".includes(event.key)) {
    lg(`You pressed "${event.key}".`);
    const text = document.createElement("span");
    text.classList = "display-digit";
    text.textContent = event.key;
    display.appendChild(text);
  } else if ("-=*+/".includes(event.key)) {
    lg(`You pressed "${event.key}".`);
    const text = document.createElement("span");
    text.classList = "display-digit";
    text.textContent = event.key;
    display.appendChild(text);
  }
});

// helloBtn1.addEventListener("click", () => console.log("hi"));
