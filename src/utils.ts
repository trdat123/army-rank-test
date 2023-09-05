import { Officer } from "./class";
import { App } from "./index";

export const colorTable = ["#1a1a1a", "#a15ef2", "#3700b3", "#cf6679"];

export const renderSubs = (subs: Officer[], list: HTMLElement | null) => {
    subs.forEach((subEl) => {
        const officerBtn = document.createElement("button");

        officerBtn.className = "officer";
        officerBtn.id = subEl.id.toString();
        officerBtn.setAttribute(
            "style",
            `margin-left: ${subEl.rank * 4}rem; background-color: ${colorTable[subEl.rank - 1]}`
        );
        officerBtn.innerText = subEl.name;
        officerBtn!.onclick = () => setOfficerForMove(subEl.id, officerBtn);

        list?.appendChild(officerBtn);

        if (subEl.subordinates.length > 0) renderSubs(subEl.subordinates, list);
        else return;
    });
};

function setOfficerForMove(subElId: number, officerBtn: HTMLButtonElement) {
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
    console.log("🚀 ~ file: utils.ts:28 ~ setOfficerForMove ~ selectedOfficers:", selectedOfficers);
}
