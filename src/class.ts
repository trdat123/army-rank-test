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

    // getRank(id: number, sub: Officer) {
    //     let rank = 1;
    //     if (sub.id == id) return rank;
    //     // if (sub.subordinates?.length == 0) return rank;
    //     if (sub.subordinates && sub.subordinates.length > 0) {
    //         sub.subordinates?.forEach((el) => {
    //             this.getRank(id, el);
    //         });
    //     }

    //     return null;
    // }
}

export class OfficerList {
    general: Officer;

    constructor(general: Officer) {
        this.general = general;
    }

    // size() {
    //     let i = 1;
    //     let currSub: Officer | null = this;
    //     while (currSub?.subordinates !== null) {
    //         i++;
    //         currSub = currSub.subordinates;
    //     }
    //     return i;
    // }
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

        general.addSub(sub2);
        general.addSub(sub3);

        sub2.addSub(sub6);

        sub3.addSub(sub4);
        sub3.addSub(sub5);

        sub4.addSub(sub7);
        sub4.addSub(sub8);

        // const officerList = new OfficerList(general);
        console.log(general);
    }

    moveOfficer(officerID: number, managerID: number): void {}

    undo(): void {}

    redo(): void {}
}
