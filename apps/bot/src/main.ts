import {NestFactory} from '@nestjs/core';
import {BotModule} from './bot.module';

async function bootstrap() {
    const app = await NestFactory.create(BotModule);
    app.enableCors({
        allowedHeaders: '*'
    })
    await app.listen(3000);
}

bootstrap();
