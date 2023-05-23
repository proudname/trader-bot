import {Injectable} from '@nestjs/common';
import {TypeOrmCrudService} from "@nestjsx/crud-typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {PortfolioItem} from "../entities/portfolio-item.entity";
import {uniq} from "lodash";

@Injectable()
export class PortfolioItemCrudService extends TypeOrmCrudService<PortfolioItem> {
    constructor(
        @InjectRepository(PortfolioItem) repository
    ) {
        super(repository);
    }

    getSelect(query, options) {
        return uniq(super.getSelect(query, options))
    }
}
