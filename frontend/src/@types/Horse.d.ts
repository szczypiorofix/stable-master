import { HORSE_SEX } from "../shared/enums";

import { FarrierVisit } from "./FarrierVisit";
import { Owner } from "./Owner";
import { VetVisit } from "./VetVisit";

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
    owner: Owner;
    vetVisits: VetVisit[];
    farrierVisits: FarrierVisit[];
}
