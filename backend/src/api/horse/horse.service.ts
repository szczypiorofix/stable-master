import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { HorseEntity } from '../../typeorm';

import { CreateHorseDto } from './create-horse.dto';

@Injectable()
export class HorseService {
    constructor(
        @InjectRepository(HorseEntity)
        private horseRepository: Repository<HorseEntity>,
    ) {}

    /**
     * Get all horses
     */
    async findAll(): Promise<HorseEntity[]> {
        return this.horseRepository.find();
    }

    /**
     * Add new horse to database
     */
    async create(createHorseDto: CreateHorseDto, avatarPath: string | null): Promise<HorseEntity> {
        const newHorse = this.horseRepository.create({
            ...createHorseDto,
            active: 1,
            avatar: avatarPath ? avatarPath : undefined,
        });

        return this.horseRepository.save(newHorse);
    }
}
