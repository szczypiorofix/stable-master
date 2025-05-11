import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerMiddleware } from '../middleware/logger.middleware';
import { HeaderMiddleware } from '../middleware/header.middleware';
import databaseRegisteredConfig, { DatabaseConfig, defaultDatabaseConfig } from '../config/database.config';
import { allEntities } from '../typeorm';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true, load: [databaseRegisteredConfig] }),
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
    ],
    controllers: [ApiController],
    providers: [ApiService],
})
export class ApiModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware, HeaderMiddleware).forRoutes('/');
    }
}
