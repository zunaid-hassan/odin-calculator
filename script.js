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
    displayMsg = "No! 😠";
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
  const targetValue = event.target.value;

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
    } else if (
      "-*+/".includes(targetValue) &&
      (firstNumberStr === "." || firstNumberStr === "-")
    ) {
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
  // logVariables();
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
}

//  Backspace Key Support
const delBtn = document.querySelector("#delBtn");

delBtn.addEventListener("click", deleteBtnInteraction);

function deleteBtnInteraction(event) {
  if (displayMsg !== "") {
    // lg(displayMsg);
    return;
  } else if (secondNumberStr !== "") {
    secondNumberStr = secondNumberStr.substring(0, secondNumberStr.length - 1);
    // lg(secondNumberStr);
    // logVariables();
    updateDisplay();
  } else if (operatorStr !== "") {
    operatorStr = "";
    // lg(secondNumberStr);
    // logVariables();
    updateDisplay();
  } else if (firstNumberStr !== "" && isResult === false) {
    firstNumberStr = firstNumberStr.substring(0, firstNumberStr.length - 1);
    // lg(firstNumberStr);
    // logVariables();
    updateDisplay();
  }
}

const kbdEvent = document.querySelector("body");
kbdEvent.addEventListener("keydown", kbdKeydown);
kbdEvent.addEventListener("keyup", kbdKeyup);

function kbdKeydown(event) {
  if (event.repeat) return;
  if (event.ctrlKey || event.altKey || event.metaKey) return;
  const eventKey = event.key;

  if (eventKey === "Delete" || eventKey === "Backspace") {
    if (eventKey === "Backspace") {
      const btn = document.querySelector("#delBtn");
      btn.click();
      btn.classList.add("clear-btn-active");
    } else {
      const btn = document.querySelector("#allClearBtn");
      btn.click();
      btn.classList.add("clear-btn-active");
    }
  } else if ("0123456789-*+/.".includes(eventKey)) {
    const btn = document.querySelector(`button[value="${eventKey}"]`);
    btn.click();
    if (btn.classList.contains("digit-btn")) {
      btn.classList.add("digit-btn-active");
    } else if (btn.classList.contains("operator-btn")) {
      btn.classList.add("operator-btn-active");
    }
  } else if (eventKey === "Enter" || eventKey === "=") {
    const btn = document.querySelector(`button[value="="]`);
    btn.click();
    btn.classList.add("equal-btn-active");
  }
}

function kbdKeyup(event) {
  if (event.repeat) return;
  if (event.ctrlKey || event.altKey || event.metaKey) return;
  const eventKey = event.key;
  if (eventKey === "Delete" || eventKey === "Backspace") {
    if (eventKey === "Backspace") {
      const btn = document.querySelector("#delBtn");
      btn.classList.remove("clear-btn-active");
    } else {
      const btn = document.querySelector("#allClearBtn");
      btn.classList.remove("clear-btn-active");
    }
  } else if ("0123456789-*+/.".includes(eventKey)) {
    const btn = document.querySelector(`button[value="${eventKey}"]`);
    if (btn.classList.contains("digit-btn")) {
      btn.classList.remove("digit-btn-active");
    } else if (btn.classList.contains("operator-btn")) {
      btn.classList.remove("operator-btn-active");
    }
  } else if (eventKey === "Enter" || eventKey === "=") {
    const btn = document.querySelector(`button[value="="]`);
    btn.classList.remove("equal-btn-active");
  }
}
