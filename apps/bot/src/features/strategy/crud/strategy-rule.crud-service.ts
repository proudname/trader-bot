import {Injectable} from '@nestjs/common';
import {TypeOrmCrudService} from "@nestjsx/crud-typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {uniq} from "lodash";
import {TradingStrategyRule} from "../entities/trading-strategy-rule.entity";

@Injectable()
export class StrategyRuleCrudService extends TypeOrmCrudService<TradingStrategyRule> {
    constructor(
        @InjectRepository(TradingStrategyRule) repository
    ) {
        super(repository);
    }

    getSelect(query, options) {
        return uniq(super.getSelect(query, options))
    }
}
