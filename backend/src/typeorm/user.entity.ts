import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity {
    @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
    id: number;

    @Column({ unique: true, length: 60 })
    email: string;

    @Column()
    password: string;

    @Column({ length: 60 })
    firstname: string;

    @Column({ length: 60 })
    lastname: string;

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
    lastlogin: Date;
}
