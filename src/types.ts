import { Officer } from "./class";

export interface OfficerMethodType {
    addSub(officer: Officer): void;
    removeSub(officer: Officer): void;
}

export interface ArmyRankingAppType {
    general: Officer;
    getSubById(id: number, subArray?: Officer[], curManager?: Officer): { sub?: Officer; manager?: Officer };
    moveOfficer(officerID: number, managerID: number): void;
    undo(): void;
    redo(): void;
}

export type OfficerIdNameType = Pick<Officer, "id" | "name">;
