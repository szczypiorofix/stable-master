import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';

import { HorseEntity } from '../../typeorm';

import { CreateHorseDto } from './create-horse.dto';
import { HorseService } from './horse.service';

@Controller('horse')
export class HorseController {
    constructor(private readonly horseService: HorseService) {}

    /**
     * Endpoint GET /horse
     * Returns list of all horses
     */
    @Get()
    async findAll(): Promise<HorseEntity[]> {
        const allHorses: HorseEntity[] = await this.horseService.findAll();
        console.log(allHorses);
        return allHorses;
    }

    /**
     * Endpoint POST /horse
     * Create new horse
     */
    @Post()
    async create(@Body(new ValidationPipe()) createHorseDto: CreateHorseDto): Promise<HorseEntity> {
        return this.horseService.create(createHorseDto);
    }
}
