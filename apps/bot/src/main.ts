import {ValidationPipe} from '@nestjs/common';
import {NestFactory} from '@nestjs/core';
import {BotModule} from './bot.module';

async function bootstrap() {
    const app = await NestFactory.create(BotModule);
    app.enableCors({
        allowedHeaders: '*'
    })
    app.useGlobalPipes(new ValidationPipe({forbidUnknownValues: false}))
    await app.listen(3000);
}

bootstrap();
