import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { StableEntity } from '../../typeorm';

import { DEFAULT_STABLE } from './stable.seed';

@Injectable()
export class StableService implements OnModuleInit {
    private readonly logger = new Logger(StableService.name);

    constructor(@InjectRepository(StableEntity) private repository: Repository<StableEntity>) {}

    async onModuleInit() {
        await this.seedStable();
    }

    public async findAll() {
        return this.repository.find();
    }

    private async seedStable() {
        this.logger.log('Checking if default stable exists...');

        const exists = await this.repository.findOne({
            where: {
                stableCode: 'DEFAULT_STABLE',
            },
        });

        if (!exists) {
            await this.repository.save(DEFAULT_STABLE);
            this.logger.log(`Default stable entry added`);
        }
    }
}
