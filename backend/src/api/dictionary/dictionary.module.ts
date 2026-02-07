import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DictionaryEntry } from '../../typeorm';

import { DictionaryController } from './dictionary.controller';
import { DictionaryService } from './dictionary.service';

@Module({
    imports: [TypeOrmModule.forFeature([DictionaryEntry])],
    controllers: [DictionaryController],
    providers: [DictionaryService],
})
export class DictionaryModule {}
