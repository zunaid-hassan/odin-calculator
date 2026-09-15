const lg = console.log;

function add(firstNumber, secondNumber) {
  return firstNumber + secondNumber;
}

function subtract(firstNumber, secondNumber) {
  return firstNumber - secondNumber;
}

function multiply(firstNumber, secondNumber) {
  return firstNumber * secondNumber;
}

function divide(firstNumber, secondNumber) {
  return firstNumber / secondNumber;
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
  // const displayLastEl = display.lastElementChild;
  // const displayLastElTextContent = display.lastElementChild.textContent;

  if (event.target.tagName !== "BUTTON") {
    return;
  }

  if (event.target.id === "allClearBtn" || event.target.id === "delBtn") {
    return;
  }

  if (firstNumberStr === "" && operatorStr === "" && secondNumberStr === "") {
    if ("0123456789".includes(targetValue) && !firstNumberStr.includes(".")) {
      firstNumberStr += targetValue;

      const text = document.createElement("span");
      text.classList = "display-digit";
      text.textContent = targetValue;
      display.appendChild(text);
    } else if (targetValue === "." && !firstNumberStr.includes(".")) {
      firstNumberStr += targetValue;

      const text = document.createElement("span");
      text.classList = "display-digit";
      text.textContent = targetValue;
      display.appendChild(text);
    } else if ("-*+/".includes(targetValue)) {
      return;
    }
  } else if (
    firstNumberStr !== "" &&
    operatorStr === "" &&
    secondNumberStr === ""
  ) {
    if ("0123456789".includes(targetValue)) {
      firstNumberStr += targetValue;

      const text = document.createElement("span");
      text.classList = "display-digit";
      text.textContent = targetValue;
      display.appendChild(text);
    } else if (targetValue === "." && !firstNumberStr.includes(".")) {
      firstNumberStr += targetValue;

      const text = document.createElement("span");
      text.classList = "display-digit";
      text.textContent = targetValue;
      display.appendChild(text);
    } else if ("-*+/".includes(targetValue)) {
      operatorStr = targetValue;

      const text = document.createElement("span");
      text.classList = "display-digit";
      text.textContent = target.textContent;
      display.appendChild(text);
    }
  } else if (
    firstNumberStr !== "" &&
    operatorStr !== "" &&
    secondNumberStr === ""
  ) {
    if ("-*+/".includes(targetValue)) {
      operatorStr = targetValue;

      const text = document.createElement("span");
      text.classList = "display-digit";
      text.textContent = target.textContent;
      display.removeChild(display.lastElementChild);
      display.appendChild(text);
    } else if (targetValue === "." && !secondNumberStr.includes(".")) {
      secondNumberStr += targetValue;

      const text = document.createElement("span");
      text.classList = "display-digit";
      text.textContent = targetValue;
      display.appendChild(text);
    } else if ("0123456789".includes(targetValue)) {
      secondNumberStr += targetValue;

      const text = document.createElement("span");
      text.classList = "display-digit";
      text.textContent = targetValue;
      display.appendChild(text);
    }
  } else {
    if ("0123456789".includes(targetValue)) {
      secondNumberStr += targetValue;

      const text = document.createElement("span");
      text.classList = "display-digit";
      text.textContent = targetValue;
      display.appendChild(text);
    } else if (targetValue === "." && !secondNumberStr.includes(".")) {
      secondNumberStr += targetValue;

      const text = document.createElement("span");
      text.classList = "display-digit";
      text.textContent = targetValue;
      display.appendChild(text);
    } else if (targetValue === "." && secondNumberStr.includes(".")) {
      return;
    } else if ("-*+/".includes(targetValue)) {
      firstNumberStr = operate(
        operatorStr,
        firstNumberStr,
        secondNumberStr,
      ).toString();
      operatorStr = targetValue;
      secondNumberStr = "";

      while (display.firstChild) {
        display.removeChild(display.firstChild);
      }

      const text = document.createElement("span");
      text.classList = "display-digit";
      text.textContent = firstNumberStr;
      display.appendChild(text);

      const textOperator = document.createElement("span");
      textOperator.classList = "display-digit";
      textOperator.textContent = operatorStr;
      display.appendChild(textOperator);
    } else {
      firstNumberStr = operate(
        operatorStr,
        firstNumberStr,
        secondNumberStr,
      ).toString();
      while (display.firstChild) {
        display.removeChild(display.firstChild);
      }
      operatorStr = "";
      secondNumberStr = "";

      const text = document.createElement("span");
      text.classList = "display-digit";
      text.textContent = firstNumberStr;
      display.appendChild(text);
    }
  }
  lg("---------------------");
  lg("firstNumberStr: " + firstNumberStr);
  lg("operatorStr: " + operatorStr);
  lg("secondNumberStr: " + secondNumberStr);
}

function updateDisplay(value) {
  const text = document.createElement("span");
  text.classList = "display-digit";
  text.textContent = value;
  display.appendChild(text);
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
