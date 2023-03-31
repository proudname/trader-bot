import {Controller} from '@nestjs/common';
import {Crud, CrudController} from '@nestjsx/crud';
import {User} from '../entity/user.entity';
import {Auth} from "../../auth/decorators/auth.decrator";
import {UserCrudService} from "./user.crud-service";

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
export class UserCrudController implements CrudController<User> {
    constructor(public service: UserCrudService) {
    }
}
