import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { HorseEntity } from './horse.entity';

@Entity({ name: 'paddocks' })
export class PaddockEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    sizeInSquareMeters: number;

    @Column()
    fenced: boolean;

    @ManyToMany(() => HorseEntity)
    @JoinTable()
    horses: HorseEntity[];
}
