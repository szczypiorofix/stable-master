import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerMiddleware } from '../middleware/logger.middleware';
import { HeaderMiddleware } from '../middleware/header.middleware';
import { DatabaseConfigModule } from '../database/database-config.module';
import { DatabaseConfigService } from '../database/database-config.service';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        TypeOrmModule.forRootAsync({
            imports: [DatabaseConfigModule],
            inject: [DatabaseConfigService],
            useFactory: (databaseConfigService: DatabaseConfigService) =>
                databaseConfigService.getDatabaseConfig(),
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
