const lg = console.log;

let firstNumberStr = "";
let secondNumberStr = "";
let operatorStr = "";
let isResult = false;
let displayMsg = "";

function add(firstNumber, secondNumber) {
  firstNumberStr = firstNumber + secondNumber;
}

function subtract(firstNumber, secondNumber) {
  firstNumberStr = firstNumber - secondNumber;
}

function multiply(firstNumber, secondNumber) {
  firstNumberStr = parseFloat((firstNumber * secondNumber).toFixed(6));
}

function divide(firstNumber, secondNumber) {
  if (secondNumber === 0) {
    firstNumberStr = "";
    secondNumberStr = "";
    operatorStr = "";
    isResult = false;
    displayMsg = "Nice try!";
  } else {
    firstNumberStr = parseFloat((firstNumber / secondNumber).toFixed(6));
  }
}

function operate(operatorStr, firstNumberStr, secondNumberStr) {
  let firstNumber = parseFloat(firstNumberStr);
  let secondNumber = parseFloat(secondNumberStr);

  if (operatorStr === "+") {
    add(firstNumber, secondNumber);
  } else if (operatorStr === "-") {
    subtract(firstNumber, secondNumber);
  } else if (operatorStr === "*") {
    multiply(firstNumber, secondNumber);
  } else if (operatorStr === "/") {
    divide(firstNumber, secondNumber);
  }
}

//  Button Interaction
const btnContainer = document.querySelector("#buttons-container");

btnContainer.addEventListener("click", btnInteraction);

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

  // BLOCK 1; all variables empty
  if (firstNumberStr === "" && operatorStr === "" && secondNumberStr === "") {
    if ("0123456789-".includes(targetValue)) {
      clearDisplayMsg();
      firstNumberStr += targetValue;

      updateDisplay();
    } else if (targetValue === "." && !firstNumberStr.includes(".")) {
      clearDisplayMsg();
      firstNumberStr += targetValue;

      updateDisplay();
    } else if ("*+/".includes(targetValue)) {
      return;
    }
  }
  // BLOCK 2; only firstNumberStr filled and is result
  else if (
    firstNumberStr !== "" &&
    isResult === true &&
    operatorStr === "" &&
    secondNumberStr === ""
  ) {
    if ("0123456789.".includes(targetValue)) {
      clearDisplayMsg();
      firstNumberStr = targetValue;
      isResult = false;

      updateDisplay();
    } else if (targetValue === "." && !firstNumberStr.includes(".")) {
      clearDisplayMsg();
      firstNumberStr = "";
      firstNumberStr += targetValue;

      isResult = false;

      updateDisplay();
    } else if ("-*+/".includes(targetValue)) {
      clearDisplayMsg();
      operatorStr = targetValue;

      updateDisplay();
    }
  }
  // BLOCK 3; only firstNumberStr filled and is not result
  else if (
    firstNumberStr !== "" &&
    isResult === false &&
    operatorStr === "" &&
    secondNumberStr === ""
  ) {
    if ("0123456789".includes(targetValue)) {
      clearDisplayMsg();
      firstNumberStr += targetValue;

      updateDisplay();
    } else if (targetValue === "." && !firstNumberStr.includes(".")) {
      clearDisplayMsg();
      firstNumberStr += targetValue;

      updateDisplay();
    } else if ("-*+/".includes(targetValue) && firstNumberStr === ".") {
      return;
    } else if ("-*+/".includes(targetValue)) {
      clearDisplayMsg();
      operatorStr = targetValue;

      updateDisplay();
    }
  }
  // BLOCK 4; only firstNumberStr filled operatorStr filled
  else if (
    firstNumberStr !== "" &&
    firstNumberStr !== "." &&
    operatorStr !== "" &&
    secondNumberStr === ""
  ) {
    if ("-*+/".includes(targetValue)) {
      clearDisplayMsg();
      operatorStr = targetValue;

      updateDisplay();
    } else if (targetValue === "." && !secondNumberStr.includes(".")) {
      clearDisplayMsg();
      secondNumberStr += targetValue;

      updateDisplay();
    } else if ("0123456789".includes(targetValue)) {
      clearDisplayMsg();
      secondNumberStr += targetValue;

      updateDisplay();
    }
  }
  // BLOCK 4; all firstNumberStr, operatorStr, and secondNumberStr are filled
  else {
    if ("0123456789".includes(targetValue)) {
      clearDisplayMsg();
      secondNumberStr += targetValue;

      updateDisplay();
    } else if (targetValue === "." && !secondNumberStr.includes(".")) {
      clearDisplayMsg();
      secondNumberStr += targetValue;

      updateDisplay();
    } else if (targetValue === "." && secondNumberStr.includes(".")) {
      return;
    } else if ("-*+/".includes(targetValue) && secondNumberStr === ".") {
      return;
    } else if ("-*+/".includes(targetValue)) {
      clearDisplayMsg();
      operate(operatorStr, firstNumberStr, secondNumberStr);
      operatorStr = targetValue;
      secondNumberStr = "";
      if (displayMsg !== "" && isResult === false) {
        isResult = true;
      }
      updateDisplay();
    } else if (secondNumberStr !== "." && "=".includes(targetValue)) {
      clearDisplayMsg();
      operate(operatorStr, firstNumberStr, secondNumberStr);

      operatorStr = "";
      secondNumberStr = "";
      if (displayMsg === "" && isResult === false) {
        isResult = true;
      }

      updateDisplay();
    }
  }
  logVariables();
}

// Display Update
const display = document.querySelector("#display");
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

  const msgDigit = document.createElement("span");
  msgDigit.classList = "msg-digit";
  msgDigit.textContent = displayMsg;
  display.appendChild(msgDigit);
}

function clearDisplay() {
  while (display.firstChild) {
    display.removeChild(display.firstChild);
  }
}

function clearDisplayMsg() {
  if (displayMsg !== "") {
    displayMsg = "";
  }
}

function logVariables() {
  lg("---------------------");
  lg("firstNumberStr: " + firstNumberStr);
  lg("operatorStr: " + operatorStr);
  lg("secondNumberStr: " + secondNumberStr);
  lg("isResult: " + isResult);
  lg("displayMsg: " + displayMsg);
}

//  AC Button

const acBtn = document.querySelector("#allClearBtn");

acBtn.addEventListener("click", acBtnInteraction);

function acBtnInteraction() {
  firstNumberStr = "";
  secondNumberStr = "";
  operatorStr = "";
  displayMsg = "";
  isResult = false;

  updateDisplay();
  logVariables();
}

//  Backspace Key Support
const delBtn = document.querySelector("#delBtn");

delBtn.addEventListener("click", deleteBtnInteraction);

function deleteBtnInteraction(event) {
  if (displayMsg !== "") {
    lg(displayMsg);
    return;
  } else if (secondNumberStr !== "") {
    secondNumberStr = secondNumberStr.substring(0, secondNumberStr.length - 1);
    lg(secondNumberStr);
    logVariables();
    updateDisplay();
  } else if (operatorStr !== "") {
    operatorStr = "";
    lg(secondNumberStr);
    logVariables();
    updateDisplay();
  } else if (firstNumberStr !== "" && isResult === false) {
    firstNumberStr = firstNumberStr.substring(0, firstNumberStr.length - 1);
    lg(firstNumberStr);
    logVariables();
    updateDisplay();
  }
}

//  Keyboard Support
// const bodyTxt = document.querySelector("body");
// bodyTxt.addEventListener("keydown", (event) => {
//   if ("0123456789".includes(event.key)) {
//     lg(`You pressed "${event.key}".`);
//     const text = document.createElement("span");
//     text.classList = "display-digit";
//     text.textContent = event.key;
//     display.appendChild(text);
//   } else if ("-=*+/".includes(event.key)) {
//     lg(`You pressed "${event.key}".`);
//     const text = document.createElement("span");
//     text.classList = "display-digit";
//     text.textContent = event.key;
//     display.appendChild(text);
//   }
// });

const kbdEvent = document.querySelector("body");
kbdEvent.addEventListener("keydown", kbdInteraction);

function kbdInteraction(event) {
  const eventKey = event.key;
  if (eventKey === "Delete" || eventKey === "Backspace") {
    if (eventKey === "Backspace") {
      document.querySelector("#delBtn").click();
    } else {
      document.querySelector("#allClearBtn").click();
    }
    // lg(eventKey);
  } else if ("0123456789-*+/.".includes(eventKey)) {
    // const eventKeyNum = parseInt(eventKey);
    document.querySelector(`button[value="${eventKey}"]`).click();
  } else if (eventKey === "Enter") {
    document.querySelector(`button[value="="]`).click();
    lg(eventKey);
  }
}

// let kbdEvent = new Event("keydown");
// lg(kbdEvent);
