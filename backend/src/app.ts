import { NestFactory } from '@nestjs/core';
import { ApiModule } from './api/api.module';
import { API_VERSION } from './shared/constants';

async function bootstrap() {
    const app = await NestFactory.create(ApiModule);
    app.setGlobalPrefix(API_VERSION);
    app.enableCors();
    await app.listen(process.env.PORT ?? 3000);
}
bootstrap()
    .then(() => console.log('Frontend application started'))
    .catch((err) => console.log(err));
