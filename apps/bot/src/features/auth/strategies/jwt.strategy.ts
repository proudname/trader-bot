import {ExtractJwt, Strategy} from 'passport-jwt';
import {PassportStrategy} from '@nestjs/passport';
import {Injectable} from '@nestjs/common';
import {JwtPayloadData} from '../types';
import {ConfigService} from "@nestjs/config";
import {Env} from "../../../types";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        configService: ConfigService<Env>,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.getOrThrow('JWT_KEY')
        });
    }

    async validate(payload: JwtPayloadData) {
        return {userId: payload.sub, username: payload.login};
    }
}
