const lg = console.log;

function add(a, b) {
  return a + b;
}

function add(a, b) {
  return a + b;
}

const btn = document.querySelector("#buttons");

const btnContainer = document.querySelector("#buttons");

const display = document.querySelector("#display");

btn.addEventListener("click", () => {
  const text = document.createElement("span");
  text.textContent = event.target.textContent;
  display.appendChild(text);
  lg(target);
});

// helloBtn1.addEventListener("click", () => console.log("hi"));
