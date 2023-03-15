import {Injectable} from '@nestjs/common';
import {TypeOrmCrudService} from '@nestjsx/crud-typeorm';
import {User} from './entity/user.entity';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from "typeorm";
import {ConfigService} from "@nestjs/config";
import {Env} from "../../types";
import {UserRole} from "./enums";

@Injectable()
export class UserService extends TypeOrmCrudService<User> {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        private configService: ConfigService<Env>
    ) {
        super(userRepository);
    }

    async createSuperAdminIfNoExist() {
        const usersCount = await this.userRepository.count();
        if (usersCount !== 0) return;
        const superAdmin = new User();
        superAdmin.login = this.configService.getOrThrow('SUPER_ADMIN_LOGIN');
        superAdmin.email = this.configService.getOrThrow('SUPER_ADMIN_EMAIL');
        superAdmin.roles = [UserRole.SUPER_ADMIN];
        await superAdmin.setPassword(this.configService.getOrThrow('SUPER_ADMIN_PASSWORD'))
        await superAdmin.save();
    }
}
