import { ArmyRankingApp, Officer } from "./class";
import { handleInput, renderSubs, setOfficerForMove } from "./utils";

export const App = new ArmyRankingApp();
let general: Officer | null = App.general;

const appWrapper = document.querySelector("#app")!;
appWrapper.innerHTML = /* html */ `
    <h1>Army Rank</h1>
    <div class="node-wrapper">
        <button id="${general.id}" class="officer"
            style="margin-left: ${general.rank * 4}rem; background-color: #1a1a1a"
        >
            ${general.name}
        </button>
        <button class="add-btn" id="add-btn-general">+</button>
    </div>
    <div id="list"></div>
    `;

const generalBtn = document.getElementById("1");
generalBtn!.onclick = () => setOfficerForMove(general!.id, generalBtn!);
const addBtn: HTMLElement | null = document.querySelector("#add-btn-general");
addBtn!.onclick = () => handleInput(addBtn, general);

/* function button assign */
const moveOfficerBtn = document.createElement("button");
moveOfficerBtn.innerText = "Move Officer";
moveOfficerBtn.onclick = () => App.moveOfficer();

const undoBtn = document.createElement("button");
undoBtn.innerText = "Undo";
undoBtn.onclick = () => App.undo();

const redoBtn = document.createElement("button");
redoBtn.innerText = "Redo";
redoBtn.onclick = () => App.redo();

const btnWrapper = document.createElement("div");
btnWrapper.className = "btn-wrapper";
btnWrapper.appendChild(moveOfficerBtn);
btnWrapper.appendChild(undoBtn);
btnWrapper.appendChild(redoBtn);

appWrapper.appendChild(btnWrapper);
/* end function button assign */

const list = document.getElementById("list");
renderSubs(general.subordinates, list);
