import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { DictionaryEntry } from './dictionary-entry.entity';
import { HorseEntity } from './horse.entity';
import { UserEntity } from './user.entity';

@Entity({ name: 'stable' })
export class StableEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ nullable: true })
    address: string;

    @Column({ unique: true }) // Unikalny kod do zapraszania pracowników?
    stableCode: string;

    @CreateDateColumn()
    createdAt: Date;

    @OneToMany(() => UserEntity, (user) => user.stable)
    users: UserEntity[];

    @OneToMany(() => HorseEntity, (horse) => horse.stable)
    horses: HorseEntity[];

    @OneToMany(() => DictionaryEntry, (entry) => entry.stable)
    dictionaryEntries: DictionaryEntry[];
}
