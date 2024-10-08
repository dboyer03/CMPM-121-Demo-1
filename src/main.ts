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

// add a status display
const growthRateDisplay = document.createElement("div");
let growthRate: number = 0;
growthRateDisplay.innerHTML = `Growth Rate: ${growthRate.toFixed(2)} fries/sec`;
app.append(growthRateDisplay);

const itemCountsDisplay = document.createElement("div");
const itemCounts: { [key: string]: number } = { A: 0, B: 0, C: 0 };
itemCountsDisplay.innerHTML = `Items Purchased: A: ${itemCounts.A}, B: ${itemCounts.B}, C: ${itemCounts.C}`;
app.append(itemCountsDisplay);

// add upgrade buttons
const upgrades: { name: string; cost: number; rate: number; button?: HTMLButtonElement }[] = [
    { name: "Upgrade A", cost: 10, rate: 0.1 },
    { name: "Upgrade B", cost: 100, rate: 2.0 },
    { name: "Upgrade C", cost: 1000, rate: 50.0 },
  ];
  
  upgrades.forEach(upgrade => {
    const upgradeButton = document.createElement("button");
    upgradeButton.innerHTML = `Buy: ${upgrade.name} (+${upgrade.rate} fries/sec) - Cost: ${upgrade.cost} fries`;
    upgradeButton.disabled = true; // initially disabled
    app.append(upgradeButton);
  
    upgradeButton.addEventListener("click", () => {
      if (counter >= upgrade.cost) {
        counter -= upgrade.cost;
        growthRate += upgrade.rate;
        itemCounts[upgrade.name]++;
        updateCounterDisplay();
      }
    });
  
    upgrade.button = upgradeButton;
  });
  
  // update counter display and upgrade button states
  const updateCounterDisplay = () => {
    counterDisplay.innerHTML = `${counter.toFixed(2)} fries`;
    growthRateDisplay.innerHTML = `Growth Rate: ${growthRate.toFixed(2)} fries/sec`;
    itemCountsDisplay.innerHTML = `Items Purchased: A: ${itemCounts.A}, B: ${itemCounts.B}, C: ${itemCounts.C}`;
    upgrades.forEach(upgrade => {
      if (upgrade.button) {
        upgrade.button.disabled = counter < upgrade.cost;
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
