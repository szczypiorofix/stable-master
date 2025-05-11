import { HORSE_SEX } from "../shared/enums";

export interface Horse {
    id: number;
    name: string;
    active: number;
    breed: string;
    birthdate: Date;
    color: string;
    sex: HORSE_SEX;
    avatar: string;
    description: string;
    age: number;
    owner: OwnerEntity;
    vetVisits: VetVisitEntity[];
    farrierVisits: FarrierVisitEntity[];
}
