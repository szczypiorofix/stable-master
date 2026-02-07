import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { DictionaryCategory } from '../../dictionary/dictionary-category.enum';
import { DictionaryEntry } from '../../typeorm';

import { CreateDictionaryEntryDto } from './create-dictionary.dto';

@Injectable()
export class DictionaryService {
    constructor(
        @InjectRepository(DictionaryEntry)
        private repo: Repository<DictionaryEntry>,
    ) {}

    async findAll(category: DictionaryCategory, stableId: number) {
        return this.repo.find({
            where: [
                { category, isSystem: true },
                { category, stableId: stableId },
            ],
            order: {
                isSystem: 'DESC',
                label: 'ASC',
            },
        });
    }

    async create(createDto: CreateDictionaryEntryDto, stableId: number) {
        const newEntry = this.repo.create({
            ...createDto,
            stableId,
            isSystem: false,
        });
        return this.repo.save(newEntry);
    }

    async remove(id: number, stableId: number) {
        const entry = await this.repo.findOne({ where: { id } });

        if (!entry) {
            throw new NotFoundException('Wpis nie istnieje');
        }

        if (entry.isSystem) {
            throw new ForbiddenException('Nie można usunąć wartości systemowej.');
        }

        if (entry.stableId !== stableId) {
            throw new ForbiddenException('Nie masz uprawnień do tego zasobu.');
        }

        return this.repo.remove(entry);
    }
}
