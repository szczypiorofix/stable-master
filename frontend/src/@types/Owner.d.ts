import { Horse } from "./Horse";

export class OwnerEntity {
    id: number;
    fullName: string;
    phoneNumber: string;
    email: string;
    horses: Horse[];
}
