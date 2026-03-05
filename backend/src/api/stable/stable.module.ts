import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { StableEntity } from '../../typeorm';

import { StableController } from './stable.controller';
import { StableService } from './stable.service';

@Module({
    imports: [TypeOrmModule.forFeature([StableEntity])],
    controllers: [StableController],
    providers: [StableService],
})
export class StableModule {}
