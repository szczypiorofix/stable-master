import { RoleEnum } from '../shared/enums/Roles.enum.ts';

export interface Person {
    id: string;
    firstName: string;
    lastName: string;
    displayName: string;
    address: string;
    sex: string;
    isRider: boolean;
    role: RoleEnum;
}
