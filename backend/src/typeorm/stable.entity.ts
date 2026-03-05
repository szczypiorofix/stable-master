import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

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

    @Column({ nullable: true })
    phone: string;

    @Column({ nullable: true })
    email: string;

    @Column({ nullable: true })
    website: string;

    @Column({ nullable: true })
    logo: string;

    @Column({ nullable: true })
    description: string;

    // like ['arena', 'round pen', 'wash rack']
    @ManyToMany(() => DictionaryEntry)
    @JoinTable({
        name: 'stable_facilities', // joining table name
        joinColumn: { name: 'stable_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'dictionary_entry_id', referencedColumnName: 'id' },
    })
    facilities: DictionaryEntry[];

    // like ['boarding', 'training', 'lessons']
    @ManyToMany(() => DictionaryEntry)
    @JoinTable({
        name: 'stable_services', // joining table name
        joinColumn: { name: 'stable_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'dictionary_entry_id', referencedColumnName: 'id' },
    })
    services: DictionaryEntry[];

    @Column({ unique: true, length: 30 }) // Unique code for workers invitations?
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
