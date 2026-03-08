import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { StableEntity } from './stable.entity';

@Entity({ name: 'users' })
export class UserEntity {
    @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
    id: number;

    @Column({ unique: true, length: 60 })
    email: string;

    @Column()
    password: string;

    @Column({ length: 60 })
    first_name: string;

    @Column({ length: 60 })
    last_name: string;

    @Column({ type: 'tinyint', unsigned: true })
    active: number;

    @Column({ length: 60 })
    address: string;

    @Column({ length: 60 })
    city: string;

    @Column({ length: 60 })
    country: string;

    @Column()
    register: Date;

    @Column({ nullable: true, default: null })
    last_login: Date;

    @ManyToOne(() => StableEntity, (stable) => stable.users)
    stable: StableEntity;
}
