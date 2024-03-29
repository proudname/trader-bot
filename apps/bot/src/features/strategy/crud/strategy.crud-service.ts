import {Injectable} from '@nestjs/common';
import {TypeOrmCrudService} from "@nestjsx/crud-typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {TradingStrategy} from "../entities/trading-strategy.entity";
import {uniq} from "lodash";

@Injectable()
export class StrategyCrudService extends TypeOrmCrudService<TradingStrategy> {
    constructor(
        @InjectRepository(TradingStrategy) repository
    ) {
        super(repository);
    }
    
    getSelect(query, options) {
        return uniq(super.getSelect(query, options))
    }
}
