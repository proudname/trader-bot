import {Injectable} from '@nestjs/common';
import {TypeOrmCrudService} from "@nestjsx/crud-typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {Selection} from "../entities/selection.entity";

@Injectable()
export class SelectionCrudService extends TypeOrmCrudService<Selection> {
    constructor(
        @InjectRepository(Selection) repository
    ) {
        super(repository);
    }
}
