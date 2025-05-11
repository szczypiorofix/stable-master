import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { HorseEntity } from './horse.entity';

@Entity({ name: 'farriervisits' })
export class FarrierVisitEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    date: Date;

    @Column('text')
    notes: string;

    @ManyToOne(() => HorseEntity, (horse) => horse.farrierVisits)
    horse: HorseEntity;

    @Column()
    farrierName: string;
}
