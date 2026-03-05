import { Controller, Get } from '@nestjs/common';

import { StableService } from './stable.service';

@Controller('stable')
export class StableController {
    constructor(private readonly stableService: StableService) {}

    /**
     * Endpoint GET /stable
     * Returns list of all stables
     */
    @Get()
    async findAll() {
        return this.stableService.findAll();
    }
}
