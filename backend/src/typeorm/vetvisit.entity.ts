import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { HorseEntity } from './horse.entity';

@Entity({ name: 'vetvisits' })
export class VetVisitEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    date: Date;

    @Column('text')
    description: string;

    @ManyToOne(() => HorseEntity, (horse) => horse.vetVisits)
    horse: HorseEntity;

    @Column()
    veterinarianName: string;
}
