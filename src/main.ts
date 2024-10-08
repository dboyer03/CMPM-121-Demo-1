import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

// set the title of the page
const gameName = "macdonald fry counter game";
document.title = gameName;

// add a header
const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

// add a button
const buttonName = "🍟";

const button = document.createElement("button");
button.innerHTML = buttonName;
app.append(button);

// add a counter display
const counterDisplay = document.createElement("div");
let counter: number = 0;
counterDisplay.innerHTML = `${counter} fries`;
app.append(counterDisplay);

// add an upgrade button
const upgradeButton = document.createElement("button");
upgradeButton.innerHTML = "buy fry cook (+1 growth rate)";
upgradeButton.disabled = true; // Initially disabled
app.append(upgradeButton);

// function to update counter display
const updateCounterDisplay = () => {
  counterDisplay.innerHTML = `${counter.toFixed(2)} fries`;
  upgradeButton.disabled = counter < 10; // Enable button if counter is at least 10
};

// update counter on button click
button.addEventListener("click", () => {
  counter++;
  updateCounterDisplay();
});

// handle upgrade button click
let growthRate = 0;
upgradeButton.addEventListener("click", () => {
  if (counter >= 10) {
    counter -= 10;
    growthRate += 1;
    updateCounterDisplay();
  }
});

// add automatic clicking
// increment counter based on elapsed time
let lastTime = performance.now();

const animate = (time: number) => {
  const deltaTime = time - lastTime;
  counter += (deltaTime / 1000) * growthRate; // Increment counter by the fraction of a second times the growth rate
  updateCounterDisplay();
  lastTime = time;
  requestAnimationFrame(animate);
};

requestAnimationFrame(animate);
