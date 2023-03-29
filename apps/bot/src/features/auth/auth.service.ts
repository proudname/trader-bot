import {Injectable, InternalServerErrorException, Logger, UnauthorizedException,} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {AuthUserData, JwtPayloadData} from './types';
import {SignUpDto} from './dto/signup.dto';
import {User} from '../user/entity/user.entity';
import {plainToClass} from "class-transformer";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";


export type FindUserByCredentialsParams = {
    login: string;
    password: string;
}


@Injectable()
export class AuthService {

    logger = new Logger(AuthService.name);

    constructor(
        private jwtService: JwtService,
        @InjectRepository(User) private readonly userRepository: Repository<User>,
    ) {
    }

    findUserByCredentials = async (params: FindUserByCredentialsParams): Promise<AuthUserData | undefined> => {
        const {login, password} = params;
        const user = await User.findByCredentials({login});
        if (!user) return;
        const {password: hash} = user;
        const isPasswordCorrect = await User.comparePasswords(password, hash);
        if (!isPasswordCorrect) return;
        delete user.password;
        return user;
    }

    async login(user: AuthUserData) {
        const payload: JwtPayloadData = {login: user.login, sub: user.id};
        return {
            access_token: this.jwtService.sign(payload)
        };
    }

    async signUp(signUpDto: SignUpDto) {
        const isExist = await this.userRepository.findOne({
            where: {
                login: signUpDto.login
            }
        });
        if (isExist) {
            throw new UnauthorizedException('Login already in use. Try another one.');
        }
        const {password, ...userData} = signUpDto;
        try {
            const user = plainToClass(User, userData);
            await user.setPassword(password);
            await this.userRepository.save(user)
            return user;
        } catch (e) {
            this.logger.error('Ошибка при сохранении пользователя', e);
            throw new InternalServerErrorException('Ошибка при сохранении пользователя');
        }
    }

}
