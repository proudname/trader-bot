import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { User } from './entity/user.entity';
import { UserService } from './user.service';

@Crud({
  model: {
    type: User
  },
})
@Controller('api/users')
export class UserController implements CrudController<User> {
  constructor(public service: UserService) {}
}
