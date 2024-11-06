import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

// Utility function to create and append elements
const createElement = (
  tag: string,
  innerHTML: string,
  parent: HTMLElement,
): HTMLElement => {
  const element = document.createElement(tag);
  element.innerHTML = innerHTML;
  parent.append(element);
  return element;
};

// Set the title of the page
const gameName = "macdonald fry clicker";
document.title = gameName;

// Add a header
createElement("h1", gameName, app);

// Add status displays
let fryCount: number = 0;
const fryCountDisplay = createElement("div", `${fryCount} fries`, app);
fryCountDisplay.classList.add("status-display");

let fryGrowthRate: number = 0;
const fryGrowthRateDisplay = createElement(
  "div",
  `Growth Rate: ${fryGrowthRate.toFixed(2)} fries/sec`,
  app,
);
fryGrowthRateDisplay.classList.add("status-display");

// Create a container for the clicker button
const clickerContainer = createElement("div", "", app);
clickerContainer.id = "clicker-container";

// Add a button
const buttonLabel = "🍟";
const fryButton = createElement(
  "button",
  buttonLabel,
  clickerContainer,
) as HTMLButtonElement;
fryButton.classList.add("clicker"); // Add this line to apply the clicker class

// Create a container for the upgrade buttons
const upgradesContainer = createElement("div", "", app);
upgradesContainer.id = "upgrades-container";

// Define Item interface
interface Item {
  name: string;
  cost: number;
  rate: number;
  description: string;
}

// Available items
const availableItems: Item[] = [
  {
    name: "Fry Cook",
    cost: 10,
    rate: 0.1,
    description: '"Flips fries with finesse"',
  },
  {
    name: "Automatic Frier",
    cost: 100,
    rate: 2,
    description: '"Fries without the fuss"',
  },
  {
    name: "Spontaneous Fry Creator",
    cost: 1000,
    rate: 50,
    description: '"Creates fries out of thin air"',
  },
  {
    name: "The Fry Man",
    cost: 10000,
    rate: 1000,
    description: '"A legend in the fry world"',
  },
  {
    name: "Ronald McDonald",
    cost: 100000,
    rate: 100000,
    description: '"The ultimate fry master"',
  },
];

// Item counts
const itemCounts: Record<string, number> = {};
availableItems.forEach((item) => (itemCounts[item.name] = 0));

// Add upgrade buttons
const upgrades = availableItems.map((item) => ({
  ...item,
  currentCost: item.cost,
  button: undefined as HTMLButtonElement | undefined,
}));

upgrades.forEach((upgrade) => {
  const upgradeButton = createElement(
    "button",
    `Buy ${upgrade.name} (+${upgrade.rate} fries/sec) - ${upgrade.currentCost.toFixed(2)} fries`,
    upgradesContainer,
  ) as HTMLButtonElement;
  upgradeButton.disabled = true; // initially disabled

  upgradeButton.addEventListener("click", () => {
    if (fryCount >= upgrade.currentCost) {
      fryCount -= upgrade.currentCost;
      fryGrowthRate += upgrade.rate;
      itemCounts[upgrade.name]++;
      upgrade.currentCost *= 1.15; // increase cost by factor of 1.15
      updateFryCountDisplay();
    }
  });

  upgrade.button = upgradeButton;
});

// Update counter display and upgrade button states
const updateFryCountDisplay = () => {
  fryCountDisplay.innerHTML = `${fryCount.toFixed(2)} fries`;
  fryGrowthRateDisplay.innerHTML = `Growth Rate: ${fryGrowthRate.toFixed(2)} fries/sec`;
  upgrades.forEach((upgrade) => {
    if (upgrade.button) {
      upgrade.button.innerHTML = `${upgrade.name} $${upgrade.currentCost.toFixed(2)} (${itemCounts[upgrade.name]}) <br> ${upgrade.description}`;
      upgrade.button.disabled = fryCount < upgrade.currentCost;
    }
  });
};

// Update counter on button click
fryButton.addEventListener("click", () => {
  fryCount++;
  updateFryCountDisplay();
});

// Add automatic clicking
// Increment counter based on elapsed time
let lastUpdateTime = performance.now();

const animate = (currentTime: number) => {
  const deltaTime = currentTime - lastUpdateTime;
  fryCount += (deltaTime / 1000) * fryGrowthRate; // increment counter by the fraction of a second times the growth rate
  updateFryCountDisplay();
  lastUpdateTime = currentTime;
  requestAnimationFrame(animate);
};

requestAnimationFrame(animate);
