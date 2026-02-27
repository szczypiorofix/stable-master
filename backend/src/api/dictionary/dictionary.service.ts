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
        private repo: Repository<DictionaryEntry>,
    ) {}

    async onModuleInit() {
        await this.seedDictionaries();
    }

    private async seedDictionaries() {
        this.logger.log('Checking dictionary entries...');

        for (const group of SYSTEM_DICTIONARIES) {
            for (const label of group.items) {
                const exists = await this.repo.findOne({
                    where: {
                        category: group.category,
                        label: label,
                        isSystem: true,
                    },
                });

                if (!exists) {
                    await this.repo.save({
                        category: group.category,
                        label: label,
                        isSystem: true,
                        stableId: null,
                    });
                    this.logger.log(`System dictionary entry added: [${group.category}] ${label}`);
                }
            }
        }
    }

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
        console.log('Removing entry with id', id);
        if (!entry) {
            throw new NotFoundException('Dictionary entry not found');
        }

        if (entry.isSystem) {
            throw new ForbiddenException('Cannot delete system dictionary entry.');
        }

        if (entry.stableId !== stableId) {
            throw new ForbiddenException('You do not have permission to delete system dictionary entry.');
        }

        return this.repo.remove(entry);
    }
}
