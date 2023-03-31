import {Injectable} from '@nestjs/common';
import {FindByCredentialsParams, User} from './entity/user.entity';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from "typeorm";
import {ConfigService} from "@nestjs/config";
import {Env} from "../../types";
import {UserRole} from "./enums";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        private configService: ConfigService<Env>
    ) {
    }

    async findByCredentials(credentials: FindByCredentialsParams) {
        return this.userRepository.createQueryBuilder('u')
            .addSelect('u.password')
            .where('u.login = :login', {login: credentials.login})
            .getOne();
    }

    async createSuperAdminIfNoExist() {
        const usersCount = await this.userRepository.count();
        if (usersCount !== 0) return;
        const superAdmin = new User();
        superAdmin.login = this.configService.getOrThrow('SUPER_ADMIN_LOGIN');
        superAdmin.email = this.configService.getOrThrow('SUPER_ADMIN_EMAIL');
        superAdmin.roles = [UserRole.SUPER_ADMIN];
        await superAdmin.setPassword(this.configService.getOrThrow('SUPER_ADMIN_PASSWORD'))
        await this.userRepository.save(superAdmin);
    }
}
