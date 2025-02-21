import { Horse, Person } from '../@types';

export const people: Person[] = [
    {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        displayName: 'John Doe',
        address: '123 Main St',
        sex: 'M',
        isRider: true,
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
];
