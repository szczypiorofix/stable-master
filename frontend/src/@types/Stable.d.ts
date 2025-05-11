import { Horse } from './Horse';
import { Person } from './Person';

export interface Stable {
    name: string;
    address: string;
    phone: string;
    email: string;
    website: string;
    logo: string;
    description: string;
    facilities: string[];
    services: string[];
    socialMedia: {
        facebook: string;
        instagram: string;
        twitter: string;
    };
    location: {
        latitude: number;
        longitude: number;
    };
    gallery: string[];
    team: Person[];
    horses: Horse[];
}
