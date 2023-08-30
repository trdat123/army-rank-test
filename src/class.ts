export class Officer {
    id: number;
    name: string;
    subordinates: Officer | null;

    constructor(id: number, name: string, subs: Officer | null) {
        this.id = id;
        this.name = name;
        this.subordinates = subs;
    }

    size() {
        let i = 1;
        let currSub: Officer | null = this;
        while (currSub?.subordinates !== null) {
            i++;
            currSub = currSub.subordinates;
        }
        return i;
    }

    getOfficer(id: number) {
        return this.id === id ? this : null;
    }

    getRank(id: number) {
        let rank = 1;
        let cur: Officer | null = this;
        while (cur) {
            if (cur.id === id) {
                return rank;
            }
            cur = cur.subordinates;
            rank++;
        }
        return -1;
    }
}

export class ArmyRankingApp {
    general: Officer;

    constructor() {
        this.general = new Officer(100, "MMP", null);

        const sub2 = new Officer(200, "John Weak", null);
        this.general.subordinates = sub2;

        const sub3 = new Officer(300, "John Cena", null);
        sub2.subordinates = sub3;
    }

    moveOfficer(officerID: number, managerID: number): void {}

    undo(): void {}

    redo(): void {}
}
