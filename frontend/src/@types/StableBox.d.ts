import { Horse } from "./Horse";

export class StableBox {
    id: number;
    boxNumber: string;
    size: string;
    isOccupied: boolean;
    horse: Horse | null;
}
