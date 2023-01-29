import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable } from '@nestjs/common';
import { AuthModuleOptions, JwtPayloadData } from '../types';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject('MODULE_OPTIONS') moduleOptions: AuthModuleOptions,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: moduleOptions.jwtKey
    });
  }

  async validate(payload: JwtPayloadData) {
    return { userId: payload.sub, username: payload.login };
  }
}
