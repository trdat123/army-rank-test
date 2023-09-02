import { Officer } from "./class";

export const colorTable = ["#1a1a1a", "#a15ef2", "#3700b3", "#cf6679"];

export const renderSubs = (subs: Officer[], list: HTMLElement | null) => {
    console.log("loop", subs);

    subs.forEach((subEl) => {
        list!.innerHTML +=
            /*html*/
            `
            <button id="${subEl.id}" style="margin-left: ${subEl.rank * 4}rem; background-color: ${
                colorTable[subEl.rank - 1]
            }">
                ${subEl.name}
            </button>
            `;
        if (subEl.subordinates.length > 0) renderSubs(subEl.subordinates, list);
        else return;
    });
};
