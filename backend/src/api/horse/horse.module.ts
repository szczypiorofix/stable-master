import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { HorseEntity } from '../../typeorm';

import { HorseController } from './horse.controller';
import { HorseService } from './horse.service';

@Module({
    imports: [TypeOrmModule.forFeature([HorseEntity])],
    controllers: [HorseController],
    providers: [HorseService],
})
export class HorseModule {}
