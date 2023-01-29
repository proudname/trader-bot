import { Injectable, NestMiddleware } from '@nestjs/common';
import passport from 'passport';
import { JwtStrategy } from './strategies/jwt.strategy';
import { Request, Response, NextFunction } from 'express';
import { Strategy } from 'passport-jwt';


@Injectable()
export class JwtMiddleware implements NestMiddleware {

  constructor(private jwtStrategy: Strategy) {
    const jwtInstance = jwtStrategy as { getPassportInstance: () => typeof passport }&JwtStrategy
    const passportInstance = jwtInstance.getPassportInstance();
    this.use = passportInstance.authenticate('jwt', { session: false });
  }

  use(req: Request, res: Response, next: NextFunction) {
    next();
  }
}