import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { HorseEntity } from './horse.entity';

@Entity({ name: 'owners' })
export class OwnerEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    fullName: string;

    @Column()
    phoneNumber: string;

    @Column()
    email: string;

    @OneToMany(() => HorseEntity, (horse) => horse.owner)
    horses: HorseEntity[];
}
