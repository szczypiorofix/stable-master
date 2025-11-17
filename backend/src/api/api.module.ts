import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import databaseRegisteredConfig, { DatabaseConfig, defaultDatabaseConfig } from '../config/database.config';
import { HeaderMiddleware } from '../middleware/header.middleware';
import { LoggerMiddleware } from '../middleware/logger.middleware';
import { allEntities } from '../typeorm';

import { HorseModule } from './horse/horse.module';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [databaseRegisteredConfig],
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => {
                const dbConfig: DatabaseConfig = configService.get<DatabaseConfig>('database') ?? defaultDatabaseConfig;
                return {
                    type: dbConfig.type,
                    host: dbConfig.host,
                    port: dbConfig.port,
                    username: dbConfig.username,
                    password: dbConfig.password,
                    database: dbConfig.database,
                    entities: allEntities,
                    synchronize: true,
                    logging: true,
                    logger: 'advanced-console',
                };
            },
        }),
        HorseModule,
    ],
    controllers: [ApiController],
    providers: [ApiService],
})
export class ApiModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware, HeaderMiddleware).forRoutes('/');
    }
}
