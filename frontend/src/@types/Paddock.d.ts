import { Horse } from "./Horse";

export class Paddock {
    id: number;
    name: string;
    sizeInSquareMeters: number;
    fenced: boolean;
    horses: Horse;
}
