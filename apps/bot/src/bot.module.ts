import { Module } from '@nestjs/common';
import {TypeOrmModule, TypeOrmModuleOptions} from "@nestjs/typeorm";
import {FeaturesModule} from "./features/features.module";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {Env} from "./types";


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService<Env>) => ({
        type: configService.getOrThrow('DB_CONNECTION'),
        host: configService.getOrThrow('DB_HOST'),
        port: +configService.getOrThrow('DB_PORT'),
        username: configService.getOrThrow('DB_USERNAME'),
        password: configService.getOrThrow('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        synchronize: Boolean(configService.getOrThrow('DB_SYNCHRONIZE')),
        autoLoadEntities: Boolean(configService.getOrThrow('DB_AUTOLOAD_ENTITIES'))
      }),
      inject: [ConfigService],
      // wtf?
    } as any),
    FeaturesModule,
  ],
})
export class BotModule {}
