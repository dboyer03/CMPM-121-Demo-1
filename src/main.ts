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
interface Item {
  name: string;
  cost: number;
  rate: number;
}

const availableItems: Item[] = [
  { name: "Fry cook", cost: 10, rate: 0.1 },
  { name: "Fry god", cost: 100, rate: 2 },
  { name: "Fry legend", cost: 1000, rate: 50 },
  { name: "Fry horror", cost: 10000, rate: 1000 },
];

const itemCounts: Record<string, number> = {};
availableItems.forEach(item => itemCounts[item.name] = 0);

itemCountsDisplay.innerHTML = `Items Purchased: ${availableItems.map(item => `${item.name}: ${itemCounts[item.name]}`).join(', ')}`;
app.append(itemCountsDisplay);

// add upgrade buttons
const upgrades = availableItems.map(item => ({
  ...item,
  currentCost: item.cost,
  button: undefined as HTMLButtonElement | undefined
}));

upgrades.forEach((upgrade) => {
  const upgradeButton = document.createElement("button");
  upgradeButton.innerHTML = `Buy ${upgrade.name} (+${upgrade.rate} fries/sec) - ${upgrade.currentCost.toFixed(2)} fries`;
  upgradeButton.disabled = true; // initially disabled
  app.append(upgradeButton);

  upgradeButton.addEventListener("click", () => {
    if (counter >= upgrade.currentCost) {
      counter -= upgrade.currentCost;
      growthRate += upgrade.rate;
      itemCounts[upgrade.name]++;
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
  itemCountsDisplay.innerHTML = `Items Purchased: ${availableItems.map(item => `${item.name}: ${itemCounts[item.name]}`).join(', ')}`;
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
