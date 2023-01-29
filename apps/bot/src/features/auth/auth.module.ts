import { DynamicModule, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './strategies/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { AuthModuleOptions } from './types';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UserModule } from '../user/user.module';

@Module({})
export class AuthModule {
  static register(options: AuthModuleOptions): DynamicModule {
    return {
      imports: [
        UserModule,
        PassportModule,
        JwtModule.register({
          secret: options.jwtKey,
          signOptions: { expiresIn: '3h' },
        })
      ],
      providers: [
        AuthService,
        LocalStrategy,
        JwtStrategy,
        {
          provide: 'MODULE_OPTIONS',
          useValue: options
        }
      ],
      controllers: [AuthController],
      module: AuthModule,
      exports: [LocalStrategy, JwtStrategy, PassportModule, JwtModule]
    }
  }
}
