import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { OwnerEntity } from './owner.entity';
import { VetVisitEntity } from './vetvisit.entity';
import { FarrierVisitEntity } from './farriervisit.entity';

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
    birthdate: Date;

    @Column()
    color: string;

    @Column()
    description: string;

    @Column()
    age: number;

    @ManyToOne(() => OwnerEntity, (owner) => owner.horses)
    owner: OwnerEntity;

    @OneToMany(() => VetVisitEntity, (visit) => visit.horse)
    vetVisits: VetVisitEntity[];

    @OneToMany(() => FarrierVisitEntity, (visit) => visit.horse)
    farrierVisits: FarrierVisitEntity[];
}
