import {Controller} from '@nestjs/common';
import {Crud, CrudController} from '@nestjsx/crud';
import {User} from './entity/user.entity';
import {UserService} from './user.service';
import {Auth} from "../auth/decorators/auth.decrator";

@Crud({
    model: {
        type: User,
    },
    routes: {
        only: ['getOneBase', 'getManyBase']
    },
    query: {
        exclude: ['password']
    }
})
@Auth()
@Controller('api/users')
export class UserController implements CrudController<User> {
    constructor(public service: UserService) {
    }
}
