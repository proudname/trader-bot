import {Global, Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {AuthController} from './auth.controller';
import {LocalStrategy} from './strategies/local.strategy';
import {PassportModule} from '@nestjs/passport';
import {JwtModule} from '@nestjs/jwt';
import {JwtStrategy} from './strategies/jwt.strategy';
import {UserModule} from '../user/user.module';
import {ConfigService} from "@nestjs/config";
import {Env} from "../../types";

@Global()
@Module({
    imports: [
        UserModule,
        PassportModule,
        JwtModule.registerAsync({
            useFactory: (configService: ConfigService<Env>) => ({
                secret: configService.getOrThrow('JWT_KEY'),
                signOptions: {expiresIn: '3h'},
            }),
            inject: [ConfigService]
        })
    ],
    providers: [
        AuthService,
        LocalStrategy,
        JwtStrategy,
    ],
    controllers: [AuthController],
    exports: [UserModule]
})
export class AuthModule {
}
