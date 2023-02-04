import {Injectable} from '@nestjs/common';
import {TypeOrmCrudService} from "@nestjsx/crud-typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {PortfolioItem} from "../entities/portfolio-item.entity";

@Injectable()
export class PortfolioItemCrudService extends TypeOrmCrudService<PortfolioItem> {
    constructor(
        @InjectRepository(PortfolioItem) repository
    ) {
        super(repository);
    }
}
