import {Injectable} from '@nestjs/common';
import {TypeOrmCrudService} from "@nestjsx/crud-typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {SelectionItem} from "../entities/selection-item.entity";

@Injectable()
export class SelectionItemCrudService extends TypeOrmCrudService<SelectionItem> {
    constructor(
        @InjectRepository(SelectionItem) repository
    ) {
        super(repository);
    }
}
