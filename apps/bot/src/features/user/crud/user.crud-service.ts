import {Injectable} from '@nestjs/common';
import {TypeOrmCrudService} from '@nestjsx/crud-typeorm';
import {User} from '../entity/user.entity';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from "typeorm";

@Injectable()
export class UserCrudService extends TypeOrmCrudService<User> {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
    ) {
        super(userRepository);
    }
}
