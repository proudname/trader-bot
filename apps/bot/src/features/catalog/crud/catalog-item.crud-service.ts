import {Injectable} from '@nestjs/common';
import {TypeOrmCrudService} from "@nestjsx/crud-typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {CatalogItem} from '../entities/catalog-item.entity';

@Injectable()
export class CatalogItemCrudService extends TypeOrmCrudService<CatalogItem> {
    constructor(
        @InjectRepository(CatalogItem) repository
    ) {
        super(repository);
    }
}
