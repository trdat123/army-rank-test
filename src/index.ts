import { ArmyRankingApp, Officer } from "./class";
import { colorTable, renderSubs } from "./utils";

const App = new ArmyRankingApp();

document.querySelector("#app")!.innerHTML = `
    <h1>Vite + TypeScript</h1>
    <div id="list">
    </div>
`;

const list = document.getElementById("list");

let general: Officer | null = App.general;

list!.innerHTML =
    /*html*/
    `
    <button id="${general.id}" style="margin-left: ${general.rank * 4}rem; background-color: ${
        colorTable[general.rank - 1]
    }">
        ${general.name}
    </button>
    `;

App.moveOfficer(400, 200);

renderSubs(general.subordinates, list);
