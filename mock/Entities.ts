import { Horse, Person, Stable } from '../src/@types';
import { USER_ROLE } from '../src/shared/enums';

export const people: Person[] = [
    {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        displayName: 'John Doe',
        address: '123 Main St',
        sex: 'M',
        isRider: true,
        role: USER_ROLE.RIDER,
    },
];

export const horses: Horse[] = [
    {
        id: '1',
        name: 'Navarro',
        dateOfBirth: '2010-01-01',
        breed: 'Thoroughbred',
        color: 'Bay',
        owner: people[0],
        age: 11,
        sex: 'stallion',
        onPaddock: true,
        avatar: '/src/assets/images/horse1.jpg',
        description: "This is a horse. It's a very nice horse.",
        gallery: [],
    },
    {
        id: '2',
        name: 'Hank',
        dateOfBirth: '2015-01-01',
        breed: 'Quarter Horse',
        color: 'Palomino',
        owner: people[0],
        age: 6,
        sex: 'gelding',
        onPaddock: false,
        description: "This is another horse. It's also a very nice horse.",
        avatar: '/src/assets/images/horse2.jpg',
        gallery: [],
    },
    {
        id: '3',
        name: 'Buddy',
        dateOfBirth: '2018-01-01',
        breed: 'Paint',
        color: 'Pinto',
        owner: people[0],
        age: 3,
        avatar: '/src/assets/images/horse3.jpg',
        description: "This is a third horse. It's also a very nice horse.",
        gallery: [],
        sex: 'gelding',
        onPaddock: true,
    },
];

export const stables: Stable[] = [
    {
        name: 'Dream Valley Stables',
        address: '123 Main St',
        phone: '123-456-7890',
        email: 'stable@email',
        website: 'https://stable.com',
        logo: '/src/assets/images/stable1.jpg',
        description: 'This is a stable. It is a very nice stable.',
        facilities: ['arena', 'round pen', 'wash rack'],
        services: ['boarding', 'training', 'lessons'],
        socialMedia: {
            facebook: 'https://facebook.com/stable',
            instagram: 'https://instagram.com/stable',
            twitter: 'https://twitter.com/stable',
        },
        location: {
            latitude: 0,
            longitude: 0,
        },
        gallery: [],
        team: people,
        horses: horses,
    },
];
