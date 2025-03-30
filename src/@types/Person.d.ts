import { USER_ROLE } from '../shared/enums';

export interface Person {
    id: string;
    firstName: string;
    lastName: string;
    displayName: string;
    address: string;
    sex: string;
    isRider: boolean;
    role: USER_ROLE;
}
