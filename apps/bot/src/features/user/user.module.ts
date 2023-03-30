import {Global, Module} from '@nestjs/common';
import {UserService} from './user.service';
import {UserController} from './user.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {User} from './entity/user.entity';

@Global()
@Module({
    imports: [TypeOrmModule.forFeature([User])],
    providers: [UserService],
    controllers: [UserController],
    exports: [TypeOrmModule]
})
export class UserModule {
    constructor(
        private userService: UserService
    ) {
        userService.createSuperAdminIfNoExist();
    }
}
