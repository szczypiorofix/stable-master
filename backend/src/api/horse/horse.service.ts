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
     * Pobiera listę wszystkich koni.
     * Możesz tu dodać obsługę paginacji lub filtrowania.
     */
    async findAll(): Promise<HorseEntity[]> {
        // Aby dołączyć relacje (np. właściciela), użyj:
        // return this.horseRepository.find({ relations: ['owner'] });
        return this.horseRepository.find();
    }

    /**
     * Tworzy nowego konia w bazie danych.
     */
    async create(createHorseDto: CreateHorseDto): Promise<HorseEntity> {
        // Tworzymy nową instancję encji na podstawie DTO
        const newHorse = this.horseRepository.create({
            ...createHorseDto,
            active: 1, // Ustawiamy domyślną wartość, jeśli nie ma jej w DTO
            // Jeśli DTO zawierałoby ownerId, tutaj musiałbyś znaleźć encję Ownera
            // i przypisać ją do newHorse.owner
        });

        // Zapisujemy nowego konia do bazy danych
        return this.horseRepository.save(newHorse);
    }
}
