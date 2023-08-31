export class Officer {
    id: number;
    name: string;
    subordinates: Officer[];
    private rank: number;

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
    constructor() {
        const general = new Officer(100, "MMP", []);

        const sub2 = new Officer(200, "John Weak", []);
        const sub3 = new Officer(300, "John Cena", []);
        const sub4 = new Officer(400, "Ben", []);
        const sub5 = new Officer(500, "Cooper", []);

        general.addSub(sub2);
        general.addSub(sub3);

        sub3.addSub(sub4);
        sub3.addSub(sub5);

        // const officerList = new OfficerList(general);
        console.log(general);
    }

    moveOfficer(officerID: number, managerID: number): void {}

    undo(): void {}

    redo(): void {}
}
