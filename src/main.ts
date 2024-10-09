import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

// set the title of the page
const gameName = "macdonald fry clicker";
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

// add status displays
const growthRateDisplay = document.createElement("div");
let growthRate: number = 0;
growthRateDisplay.innerHTML = `Growth Rate: ${growthRate.toFixed(2)} fries/sec`;
app.append(growthRateDisplay);

const itemCountsDisplay = document.createElement("div");
type ItemKey = "A" | "B" | "C";
const itemCounts: Record<ItemKey, number> = { A: 0, B: 0, C: 0 };
itemCountsDisplay.innerHTML = `Items Purchased: Fry cook: ${itemCounts.A}, Fry god: ${itemCounts.B}, Fry legend: ${itemCounts.C}`;
app.append(itemCountsDisplay);

// add upgrade buttons
const upgrades: {
  name: string;
  baseCost: number;
  currentCost: number;
  rate: number;
  button?: HTMLButtonElement;
}[] = [
  { name: "Fry cook", baseCost: 10, currentCost: 10, rate: 0.1 },
  { name: "Fry god", baseCost: 100, currentCost: 100, rate: 2.0 },
  { name: "Fry legend", baseCost: 1000, currentCost: 1000, rate: 50.0 },
];

upgrades.forEach((upgrade) => {
  const upgradeButton = document.createElement("button");
  upgradeButton.innerHTML = `Buy ${upgrade.name} (+${upgrade.rate} fries/sec) - ${upgrade.currentCost.toFixed(2)} fries`;
  upgradeButton.disabled = true; // initially disabled
  app.append(upgradeButton);

  upgradeButton.addEventListener("click", () => {
    if (counter >= upgrade.currentCost) {
      counter -= upgrade.currentCost;
      growthRate += upgrade.rate;
      itemCounts[upgrade.name as ItemKey]++;
      upgrade.currentCost *= 1.15; // increase cost by factor of 1.15
      updateCounterDisplay();
    }
  });

  upgrade.button = upgradeButton;
});

// update counter display and upgrade button states
const updateCounterDisplay = () => {
  counterDisplay.innerHTML = `${counter.toFixed(2)} fries`;
  growthRateDisplay.innerHTML = `Growth Rate: ${growthRate.toFixed(2)} fries/sec`;
  itemCountsDisplay.innerHTML = `Items Purchased: Fry cook: ${itemCounts.A}, Fry god: ${itemCounts.B}, Fry legend: ${itemCounts.C}`;
  upgrades.forEach((upgrade) => {
    if (upgrade.button) {
      upgrade.button.innerHTML = `Buy: ${upgrade.name} (+${upgrade.rate} fries/sec) - Cost: ${upgrade.currentCost.toFixed(2)} fries`;
      upgrade.button.disabled = counter < upgrade.currentCost;
    }
  });
};

// update counter on button click
button.addEventListener("click", () => {
  counter++;
  updateCounterDisplay();
});

// add automatic clicking
// increment counter based on elapsed time
let lastTime = performance.now();

const animate = (time: number) => {
  const deltaTime = time - lastTime;
  counter += (deltaTime / 1000) * growthRate; // increment counter by the fraction of a second times the growth rate
  updateCounterDisplay();
  lastTime = time;
  requestAnimationFrame(animate);
};

requestAnimationFrame(animate);
