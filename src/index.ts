import { ArmyRankingApp, Officer } from "./class";
import { colorTable, renderSubs } from "./utils";

export const App = new ArmyRankingApp();
let general: Officer | null = App.general;

const appWrapper = document.querySelector("#app")!;
appWrapper.innerHTML = /* html */ `
    <h1>Army Rank</h1>
        <button id="${general.id}" class="officer"
            style="margin-left: ${general.rank * 4}rem; background-color: ${colorTable[general.rank - 1]}"
        >
            ${general.name}
        </button>
    <div id="list"></div>
    `;

const moveOfficerBtn = document.createElement("button");
moveOfficerBtn.innerText = "Move Officer";
moveOfficerBtn.onclick = () => App.moveOfficer();

appWrapper.appendChild(moveOfficerBtn);

const list = document.getElementById("list");

renderSubs(general.subordinates, list);
