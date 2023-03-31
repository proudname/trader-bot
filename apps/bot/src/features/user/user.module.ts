import {Global, Module} from '@nestjs/common';
import {UserService} from './user.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {User} from './entity/user.entity';
import {ConfigService} from "@nestjs/config";
import {Env} from "../../types";
import {UserCrudService} from "./crud/user.crud-service";
import {UserCrudController} from "./crud/user.crud-controller";

@Global()
@Module({
    imports: [TypeOrmModule.forFeature([User])],
    providers: [UserService, UserCrudService],
    controllers: [UserCrudController],
    exports: [TypeOrmModule, UserService]
})
export class UserModule {
    constructor(
        private userService: UserService,
        private configService: ConfigService<Env>
    ) {
        if (
            this.configService.getOrThrow('NODE_ENV') === 'development'
            && this.configService.getOrThrow('SUPER_ADMIN_CREATE') === 'true') {
            this.userService.createSuperAdminIfNoExist();
        }
    }
}
