import {
    BadRequestException,
    Body,
    Controller,
    Get,
    Post,
    UploadedFile,
    UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

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
    @UseInterceptors(
        FileInterceptor('avatarFile', {
            storage: diskStorage({
                destination: './uploads', // must exist!
                filename: (_req, file, cb) => {
                    const randomName = Array(32)
                        .fill(null)
                        .map(() => Math.round(Math.random() * 16).toString(16))
                        .join('');
                    cb(null, `${randomName}${extname(file.originalname)}`);
                },
            }),
            fileFilter: (req, file, cb) => {
                const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
                const maxSize = 5 * 1024 * 1024;

                if (!allowedTypes.includes(file.mimetype)) {
                    return cb(new BadRequestException('Incorrect file type. Allowed only: JPG, PNG, WebP'), false);
                }

                if (file.size > maxSize) {
                    return cb(new BadRequestException('File size too big (max 5MB)'), false);
                }

                cb(null, true);
            },
            limits: {
                fileSize: 5 * 1024 * 1024,
            },
        }),
    )
    async create(
        @UploadedFile()
        file: Express.Multer.File,
        @Body() createHorseDto: CreateHorseDto,
    ): Promise<HorseEntity> {
        const avatarPath: string | null = file ? `public/${file.filename}` : null;
        const dtoWithParsedData = {
            ...createHorseDto,
            age: parseInt(createHorseDto.age as any as string, 10),
        };
        return this.horseService.create(dtoWithParsedData, avatarPath);
    }
}
