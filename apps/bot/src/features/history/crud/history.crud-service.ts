import {Injectable} from '@nestjs/common';
import {TypeOrmCrudService} from "@nestjsx/crud-typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {History} from '../entities/history.entity'

@Injectable()
export class HistoryCrudService extends TypeOrmCrudService<History> {
    constructor(
        @InjectRepository(History) repository
    ) {
        super(repository);
    }
}
