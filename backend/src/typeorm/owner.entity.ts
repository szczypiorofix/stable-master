import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { HorseEntity } from './horse.entity';

@Entity({ name: 'owners' })
export class OwnerEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    full_name: string;

    @Column()
    phone_number: string;

    @Column()
    email: string;

    @OneToMany(() => HorseEntity, (horse) => horse.owner)
    horses: HorseEntity[];
}
