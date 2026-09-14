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

function operate(operator, firstNumber, secondNumber) {
  if (operator === "+") {
    add(firstNumber, secondNumber);
  } else if (operator === "-") {
    subtract(firstNumber, secondNumber);
  } else if (operator === "*") {
    multiply(firstNumber, secondNumber);
  } else {
    divide(firstNumber, secondNumber);
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
let operator = "";

function btnInteraction(event) {
  if (event.target.tagName !== "BUTTON") {
    return;
  }

  if (event.target.id === "allClearBtn" || event.target.id === "delBtn") {
    return;
  }

  if ("0123456789".includes(event.target.value)) {
    const text = document.createElement("span");
    text.classList = "display-digit";
    text.textContent = event.target.value;
    display.appendChild(text);
    // lg(text);

    firstNumberStr += event.target.value;
    // lg(firstNumberStr);
  } else if (
    "-*+/".includes(event.target.value) &&
    display.lastElementChild !== null
  ) {
    const text = document.createElement("span");
    text.classList = "display-digit";
    text.textContent = event.target.textContent;
    lg(text);
    if ("-×+÷".includes(display.lastElementChild.textContent)) {
      display.removeChild(display.lastElementChild);
      display.appendChild(text);
      //   lg(display.lastElementChild);
    } else {
      display.appendChild(text);
    }

    operator = event.target.value;
    // lg("operator: " + operator);
    // lg(display.lastElementChild.textContent);
  }
}

btnContainer.addEventListener("click", btnInteraction);

const acBtn = document.querySelector("#allClearBtn");

acBtn.addEventListener("click", () => {
  let display = document.getElementById("display");
  if (display.textContent.length > 0) {
    display.textContent = "";
  }
});

const delBtn = document.querySelector("#delBtn");

delBtn.addEventListener("click", () => {
  let display = document.getElementById("display");
  if (display.textContent.length > 0) {
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
