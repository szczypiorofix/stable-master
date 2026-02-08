import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { DictionaryCategory } from '../dictionary/dictionary-category.enum';

import { StableEntity } from './stable.entity';

@Entity('dictionaryentry')
export class DictionaryEntry {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'enum',
        enum: DictionaryCategory,
    })
    category: DictionaryCategory;

    @Column()
    label: string;

    @Column({ default: false })
    isSystem: boolean; // true for everyone, cannot be deleted

    @Column({ nullable: true })
    stableId: number | null; // NULL for system, ID for private

    @ManyToOne(() => StableEntity, { nullable: true, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'stableId' })
    stable: StableEntity;
}
