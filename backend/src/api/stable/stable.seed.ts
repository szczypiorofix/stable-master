import { StableEntity } from '../../typeorm';

export const DEFAULT_STABLE: Partial<StableEntity> = {
    name: 'Dream Valley Stables',
    stable_code: 'DEFAULT_STABLE',
    address: '123 Main St',
    phone: '123-456-7890',
    email: 'stable@email',
    website: 'https://stable.com',
    logo: 'stable1.jpg',
    description: 'This is a stable. It is a very nice stable.',
};
