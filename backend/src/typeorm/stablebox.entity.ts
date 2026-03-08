import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { HorseEntity } from './horse.entity';

@Entity({ name: 'stableboxes' })
export class StableBoxEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    box_number: string;

    @Column()
    size: string;

    @Column()
    is_occupied: boolean;

    @OneToOne(() => HorseEntity, { nullable: true })
    @JoinColumn()
    horse: HorseEntity | null;
}
