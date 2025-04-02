import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { allEntities } from '../typeorm';

@Injectable()
export class DatabaseConfigService {
    public constructor(private configService: ConfigService) {}

    public getDatabaseConfig(): TypeOrmModuleOptions {
        return {
            type: 'mysql',
            host: this.configService.get('MYSQL_HOST'),
            port: parseInt(this.configService.get('MYSQL_PORT') || '3000'),
            username: this.configService.get('MYSQL_USER'),
            password: this.configService.get('MYSQL_PASSWORD'),
            database: this.configService.get('MYSQL_DATABASE'),
            entities: allEntities,
            synchronize: true,
        };
    }
}
