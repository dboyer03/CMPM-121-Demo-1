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



