import {Injectable} from '@nestjs/common';
import {TypeOrmCrudService} from "@nestjsx/crud-typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {Selection} from "../entities/selection.entity";
import {uniq} from 'lodash'

@Injectable()
export class SelectionCrudService extends TypeOrmCrudService<Selection> {
    constructor(
        @InjectRepository(Selection) repository
    ) {
        super(repository);
    }

    getSelect(query, options) {
        return uniq(super.getSelect(query, options))
    }
}
