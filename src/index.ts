import { ArmyRankingApp, Officer } from "./class";

const App = new ArmyRankingApp();

// initiate general
document.querySelector("#app")!.innerHTML = `
    <h1>Vite + TypeScript</h1>
    <div id="list">
    </div>
`;

const list = document.getElementById("list");

let cur: Officer | null = App.general;

const colorTable = ["#1a1a1a", "#a15ef2", "#3700b3", "#cf6679"];

while (cur) {
    let curRank: number = App.general.getRank(cur.id);

    list!.innerHTML +=
        /*html*/
        `
        <button id="${cur.id}" style="margin-left: ${curRank * 6}rem; background-color: ${
            colorTable[curRank - 1]
        }">
            ${cur.name}
        </button>
        `;

    cur = cur.subordinates;
}
