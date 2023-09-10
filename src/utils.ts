import { Officer } from "./class";
import { App } from "./index";

export const renderColor = (position: number) => (position % 2 == 0 ? "#1971C2" : "#FA5252");

export const generateId = () => parseInt(Math.random().toString(10).slice(2));

export const reRenderList = () => {
    const list = document.getElementById("list");
    list?.replaceChildren();
    renderSubs(App.general.subordinates, list);
};

export const renderSubs = (subs: Officer[], list: HTMLElement | null) => {
    subs.forEach((subEl) => {
        const officerBtn = document.createElement("button");
        officerBtn.className = "officer";
        officerBtn.id = subEl.id.toString();
        officerBtn.setAttribute(
            "style",
            `margin-left: ${subEl.rank * 4}rem; background-color: ${renderColor(subEl.rank)};`
        );
        officerBtn.innerText = subEl.name;
        officerBtn!.onclick = () => setOfficerForMove(subEl.id, officerBtn);

        const addBtn = document.createElement("button");
        addBtn.className = "add-btn";
        addBtn.id = `add-btn-${subEl.id}`;
        addBtn.innerText = "+";
        addBtn.onclick = () => handleInput(addBtn, subEl);

        const nodeWrapper = document.createElement("div");
        nodeWrapper.className = "node-wrapper";
        nodeWrapper.appendChild(officerBtn);
        nodeWrapper.appendChild(addBtn);

        list?.appendChild(nodeWrapper);

        if (subEl.subordinates.length > 0) renderSubs(subEl.subordinates, list);
        else return;
    });
};

export function setOfficerForMove(subElId: number, officerBtn: HTMLElement) {
    let selectedOfficers = App.selectedOfficers;

    if (selectedOfficers.some((el) => el === subElId)) {
        // remove selectedOfficer
        const targetSubIndex = selectedOfficers.indexOf(subElId);
        if (targetSubIndex > -1) {
            selectedOfficers.splice(targetSubIndex, 1);
            officerBtn.style.outline = "";
        }
    } else if (selectedOfficers.length < 2) {
        selectedOfficers.push(subElId);
        officerBtn.style.outline = "5px auto white";
    }
}

export function handleInput(btn: HTMLElement | null, parent: Officer | null) {
    btn!.style.display = "none";
    const input = document.createElement("input");
    btn?.parentElement?.appendChild(input);

    input.focus();
    input.onblur = () => {
        input.style.display = "none";
        btn!.style.display = "";
    };
    input.addEventListener("keyup", function (event) {
        if (event.key === "Enter") {
            if (input.value === "") return;
            const sub = new Officer(generateId(), input.value, []);
            parent!.addSub(sub);
            input.value = "";
            input.style.display = "none";
            reRenderList();
        }
    });
}
