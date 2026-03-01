import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Query, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { DictionaryCategory } from '../../dictionary/dictionary-category.enum';
import { User } from '../../shared/decorators/user.decorator';
import { DictionaryEntry } from '../../typeorm';

import { CreateDictionaryEntryDto } from './create-dictionary.dto';
import { DictionaryService } from './dictionary.service';

@Controller('dictionary')
@UseGuards(JwtAuthGuard)
export class DictionaryController {
    constructor(private readonly dictionaryService: DictionaryService) {}

    @Get()
    async findAll(
        @Query('category') category: DictionaryCategory,
        @User('stableId') stableId: number,
    ): Promise<DictionaryEntry[]> {
        return this.dictionaryService.findAll(category, stableId);
    }

    @Post()
    async create(
        @Body() createDto: CreateDictionaryEntryDto,
        @User('stableId') stableId: number,
    ): Promise<DictionaryEntry> {
        return this.dictionaryService.create(createDto, stableId);
    }

    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number, @User('stableId') stableId: number): Promise<DictionaryEntry> {
        return this.dictionaryService.remove(id, stableId);
    }
}
