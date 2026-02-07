import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

import { DictionaryCategory } from '../../dictionary/dictionary-category.enum';

export class CreateDictionaryEntryDto {
    @IsNotEmpty()
    @IsString()
    label: string;

    @IsEnum(DictionaryCategory)
    category: DictionaryCategory;
}
