import { ForbiddenException, Injectable, Logger, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { DictionaryCategory } from '../../dictionary/dictionary-category.enum';
import { DictionaryEntry } from '../../typeorm';

import { CreateDictionaryEntryDto } from './create-dictionary.dto';
import { SYSTEM_DICTIONARIES } from './dictionary.seed';

@Injectable()
export class DictionaryService implements OnModuleInit {
    private readonly logger = new Logger(DictionaryService.name);

    constructor(
        @InjectRepository(DictionaryEntry)
        private repository: Repository<DictionaryEntry>,
    ) {}

    async onModuleInit() {
        await this.seedDictionaries();
    }

    private async seedDictionaries() {
        this.logger.log('Checking dictionary entries...');

        for (const group of SYSTEM_DICTIONARIES) {
            for (const label of group.items) {
                const exists = await this.repository.findOne({
                    where: {
                        category: group.category,
                        label: label,
                        is_system: true,
                    },
                });

                if (!exists) {
                    await this.repository.save({
                        category: group.category,
                        label: label,
                        is_system: true,
                        stable_id: null,
                    });
                    this.logger.log(`System dictionary entry added: [${group.category}] ${label}`);
                }
            }
        }
    }

    async findAll(category: DictionaryCategory, stableId: number) {
        return this.repository.find({
            where: [
                { category, is_system: true },
                { category, stable_id: stableId },
            ],
            order: {
                is_system: 'DESC',
                label: 'ASC',
            },
        });
    }

    async create(createDto: CreateDictionaryEntryDto, stable_id: number) {
        const newEntry = this.repository.create({
            ...createDto,
            stable_id,
            is_system: false,
        });
        return this.repository.save(newEntry);
    }

    async remove(id: number, stableId: number) {
        const entry = await this.repository.findOne({ where: { id } });
        console.log('Removing entry with id', id);
        if (!entry) {
            throw new NotFoundException('Dictionary entry not found');
        }

        if (entry.is_system) {
            throw new ForbiddenException('Cannot delete system dictionary entry.');
        }

        if (entry.stable_id !== stableId) {
            throw new ForbiddenException('You do not have permission to delete system dictionary entry.');
        }

        return this.repository.remove(entry);
    }
}
