import { ArmyRankingAppMethodType, OfficerMethodType } from "./types";
import { generateId, reRenderList, renderSubs } from "./utils";

export class Officer implements OfficerMethodType {
    readonly id: number;
    readonly name: string;
    subordinates: Officer[];
    rank: number;
    isSelected: boolean;

    constructor(id: number, name: string, subs: Officer[]) {
        this.id = id;
        this.name = name;
        this.subordinates = subs;
        this.rank = 1;
        this.isSelected = false;
    }

    updateSubsRank(subArray: Officer[], variation: "upRank" | "downRank") {
        subArray.forEach((subEl) => {
            if (variation == "upRank") subEl.rank--;
            if (variation == "downRank") subEl.rank++;

            if (subEl.subordinates.length > 0) this.updateSubsRank(subEl.subordinates, variation);
            else return;
        });
    }

    addSub(officer: Officer, updateChildRank?: "upRank" | "downRank") {
        officer.rank = this.rank + 1;
        if (officer.subordinates.length > 0 && updateChildRank) {
            this.updateSubsRank(officer.subordinates, updateChildRank);
        }
        this.subordinates?.push(officer);
    }

    removeSub(officer: Officer) {
        const targetSubIndex = this.subordinates.indexOf(officer);
        if (targetSubIndex > -1) {
            this.subordinates.splice(targetSubIndex, 1);
        }
    }
}

export class ArmyRankingApp implements ArmyRankingAppMethodType {
    readonly general: Officer;
    selectedOfficers: number[];
    actionStore: {
        id: number;
        action: "undo" | "redo";
        sub?: Officer;
        oldManager?: Officer;
        curManager?: Officer;
        newManager?: Officer;
        subChild?: Officer[];
    }[];

    constructor() {
        const general = new Officer(1, "MMP", []);
        this.general = general;
        this.selectedOfficers = [];
        this.actionStore = [];

        const sub2 = new Officer(generateId(), "John Weak", []);
        const sub3 = new Officer(generateId(), "John Cena", []);
        const sub4 = new Officer(generateId(), "Ben", []);
        const sub5 = new Officer(generateId(), "Cooper", []);
        const sub6 = new Officer(generateId(), "A", []);
        const sub7 = new Officer(generateId(), "B", []);
        const sub8 = new Officer(generateId(), "C", []);
        const sub9 = new Officer(generateId(), "D", []);
        const sub10 = new Officer(generateId(), "E", []);

        general.addSub(sub2);
        general.addSub(sub3);
        sub2.addSub(sub6);
        sub3.addSub(sub4);
        sub3.addSub(sub5);
        sub4.addSub(sub7);
        sub4.addSub(sub8);
        sub8.addSub(sub9);
        sub9.addSub(sub10);
    }

    removeAction(id: number) {
        return (this.actionStore = this.actionStore.filter((el) => el.id !== id));
    }

    getSubById(id: number, subArray?: Officer[], curManager?: Officer) {
        let res: { sub?: Officer; manager?: Officer } = { sub: undefined, manager: curManager };
        if (id === 1) {
            res.sub = this.general;
        }
        subArray = subArray ?? this.general.subordinates;
        curManager = curManager ?? this.general;

        for (let el of subArray) {
            if (el.id === id) {
                res.sub = el;
                res.manager = curManager;
                break;
            } else if (!res.sub && el.subordinates.length > 0) {
                res = this.getSubById(id, el.subordinates, el);
            }
        }

        return res;
    }

    moveOfficer(): void {
        const [subId, newManagerId] = this.selectedOfficers;

        if (this.selectedOfficers.length < 2) {
            alert("Something wrong, not enough data");
            return;
        }

        const { sub, manager: curManager } = this.getSubById(subId);
        const { sub: newManager } = this.getSubById(newManagerId);
        let subChild: Officer[] = [];

        // move sub's subordinates array up to 1 rank
        sub?.subordinates.forEach((sub) => {
            curManager?.addSub(sub, "upRank");
            subChild.push(sub);
        });
        sub!.subordinates = [];

        this.actionStore.push({
            id: generateId(),
            action: "undo",
            sub,
            oldManager: curManager,
            curManager: newManager,
            subChild,
        });

        curManager?.removeSub(sub!);
        newManager?.addSub(sub!);

        reRenderList();
        this.selectedOfficers = [];
    }

    undo(): void {
        // get last undo action
        const action = this.actionStore.findLast((el) => el.action === "undo");
        if (!action) return;

        const { id, sub, oldManager, curManager, subChild } = action;

        oldManager?.addSub(sub!);
        curManager?.removeSub(sub!);
        subChild?.forEach((child) => {
            sub?.addSub(child, "downRank");
            oldManager?.removeSub(child);
        });

        reRenderList();
        this.removeAction(id);

        this.actionStore.push({
            id: generateId(),
            action: "redo",
            sub,
            curManager: oldManager,
            newManager: curManager,
        });
    }

    redo(): void {
        // get last redo action
        const action = this.actionStore.findLast((el) => el.action === "redo");
        if (!action) return;

        const { id, sub, curManager, newManager } = action;
        let subChild: Officer[] = [];

        sub?.subordinates.forEach((sub) => {
            curManager?.addSub(sub, "upRank");
            subChild.push(sub);
        });
        sub!.subordinates = [];

        this.actionStore.push({
            id: generateId(),
            action: "undo",
            sub,
            oldManager: curManager,
            curManager: newManager,
            subChild,
        });

        curManager?.removeSub(sub!);
        newManager?.addSub(sub!);

        reRenderList();
        this.removeAction(id);
    }
}
