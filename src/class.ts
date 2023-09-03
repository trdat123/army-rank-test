export class Officer {
    id: number;
    name: string;
    subordinates: Officer[];
    rank: number;

    constructor(id: number, name: string, subs: Officer[]) {
        this.id = id;
        this.name = name;
        this.subordinates = subs;
        this.rank = 1;
    }

    addSub(officer: Officer) {
        officer.rank = this.rank + 1;
        this.subordinates?.push(officer);
    }

    removeSub(officer: Officer) {
        const targetSubIndex = this.subordinates.indexOf(officer);
        if (targetSubIndex > -1) {
            this.subordinates.splice(targetSubIndex, 1);
        }
    }
}

export class ArmyRankingApp {
    general: Officer;

    constructor() {
        const general = new Officer(100, "MMP", []);
        this.general = general;

        const sub2 = new Officer(200, "John Weak", []);
        const sub3 = new Officer(300, "John Cena", []);
        const sub4 = new Officer(400, "Ben", []);
        const sub5 = new Officer(500, "Cooper", []);
        const sub6 = new Officer(600, "A", []);
        const sub7 = new Officer(700, "B", []);
        const sub8 = new Officer(800, "C", []);
        const sub9 = new Officer(900, "D", []);

        general.addSub(sub2);
        general.addSub(sub3);

        sub2.addSub(sub6);

        sub3.addSub(sub4);
        sub3.addSub(sub5);

        sub4.addSub(sub7);
        sub4.addSub(sub8);

        sub8.addSub(sub9);

        console.log(general);
    }

    getSubById(id: number, subArray?: Officer[], curManager?: Officer) {
        let res: { sub?: Officer; manager?: Officer } = { sub: undefined, manager: curManager };
        subArray = subArray ?? this.general.subordinates;

        for (let el of subArray) {
            if (el.id === id) {
                res.sub = el;
                break;
            } else if (el.subordinates.length > 0) {
                res = this.getSubById(id, el.subordinates, el);
            }
        }

        return res;
    }

    moveOfficer(subId: number, newManagerId: number): void {
        const { sub, manager: curManager } = this.getSubById(subId);
        const { sub: newManager } = this.getSubById(newManagerId);

        // 1. move sub's subordinates array up to 1 rank
        sub!.subordinates.forEach((sub) => {
            // sub.removeSub(sub);
            curManager?.addSub(sub);
        });
        sub!.subordinates = [];

        // 2. remove current sub position
        curManager?.removeSub(sub!);

        // 3. add sub to new position
        newManager?.addSub(sub!);
    }

    undo(): void {}

    redo(): void {}
}
