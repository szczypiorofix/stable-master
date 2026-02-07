import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Query, Req } from '@nestjs/common';

import { DictionaryCategory } from '../../dictionary/dictionary-category.enum';
import { DictionaryEntry } from '../../typeorm';

import { CreateDictionaryEntryDto } from './create-dictionary.dto';
import { DictionaryService } from './dictionary.service';

@Controller('dictionary')
export class DictionaryController {
    constructor(private readonly dictionaryService: DictionaryService) {}

    @Get()
    async findAll(@Query('category') category: DictionaryCategory, @Req() req): Promise<DictionaryEntry[]> {
        const stableId = 1;
        return this.dictionaryService.findAll(category, stableId);
    }

    @Post()
    async create(@Body() createDto: CreateDictionaryEntryDto, @Req() req): Promise<DictionaryEntry> {
        const stableId = 1;
        return this.dictionaryService.create(createDto, stableId);
    }

    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number, @Req() req): Promise<DictionaryEntry> {
        const stableId = 1;
        return this.dictionaryService.remove(id, stableId);
    }
}
