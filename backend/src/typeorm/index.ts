import { UserEntity } from './user.entity';
import { HorseEntity } from './horse.entity';
import { OwnerEntity } from './owner.entity';
import { StableBoxEntity } from './stablebox.entity';
import { PaddockEntity } from './paddock.entity';
import { VetVisitEntity } from './vetvisit.entity';
import { FarrierVisitEntity } from './farriervisit.entity';

export * from './horse.entity';
export * from './user.entity';
export * from './owner.entity';
export * from './stablebox.entity';
export * from './paddock.entity';
export * from './vetvisit.entity';
export * from './farriervisit.entity';

export const allEntities = [
    UserEntity,
    HorseEntity,
    OwnerEntity,
    StableBoxEntity,
    PaddockEntity,
    VetVisitEntity,
    FarrierVisitEntity,
];
