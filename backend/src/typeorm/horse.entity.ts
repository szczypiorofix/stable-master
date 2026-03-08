import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { FarrierVisitEntity } from './farriervisit.entity';
import { OwnerEntity } from './owner.entity';
import { StableEntity } from './stable.entity';
import { VetVisitEntity } from './vetvisit.entity';

export enum HORSE_SEX {
    MARE = 'mare',
    STALLION = 'stallion',
    GELDING = 'gelding',
}

@Entity({ name: 'horses' })
export class HorseEntity {
    @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
    id: number;

    @Column({ length: 60 })
    name: string;

    @Column({ type: 'tinyint', unsigned: true })
    active: number;

    @Column({ length: 60 })
    breed: string;

    @Column()
    birth_date: Date;

    @Column()
    coat: string;

    @Column('enum', { enum: HORSE_SEX })
    sex: string;

    @Column()
    avatar: string;

    @Column()
    description: string;

    @Column()
    age: number;

    @ManyToOne(() => OwnerEntity, (owner) => owner.horses)
    owner: OwnerEntity;

    @OneToMany(() => VetVisitEntity, (visit) => visit.horse)
    vet_visits: VetVisitEntity[];

    @OneToMany(() => FarrierVisitEntity, (visit) => visit.horse)
    farrier_visits: FarrierVisitEntity[];

    @ManyToOne(() => StableEntity, (stable) => stable.users)
    stable: StableEntity;
}
