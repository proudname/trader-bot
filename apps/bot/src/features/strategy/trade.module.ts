import {Module} from '@nestjs/common';
import {StrategyCrudController} from "./crud/strategy.crud-controller";
import {StrategyCrudService} from "./crud/strategy.crud-service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {TradingStrategy} from "./entities/trading-strategy.entity";
import {TradingStrategyRule} from "./entities/trading-strategy-rule.entity";

@Module({
    imports: [TypeOrmModule.forFeature([TradingStrategy, TradingStrategyRule])],
    controllers: [StrategyCrudController],
    providers: [StrategyCrudService]
})
export class StrategyModule {
}
