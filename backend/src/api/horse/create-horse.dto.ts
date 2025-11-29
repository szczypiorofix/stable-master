import { IsEnum, IsInt, IsNotEmpty, IsString } from 'class-validator';

import { HORSE_SEX } from '../../typeorm';

export class CreateHorseDto {
    @IsString()
    name: string;

    @IsString()
    breed: string;

    @IsNotEmpty()
    birthdate: Date;

    @IsString()
    color: string;

    @IsEnum(HORSE_SEX)
    sex: HORSE_SEX;

    @IsString()
    description: string;

    @IsInt()
    age: number;
}
