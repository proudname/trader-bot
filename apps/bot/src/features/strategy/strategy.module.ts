import {Module} from '@nestjs/common';
import {StrategyCrudController} from "./crud/strategy.crud-controller";
import {StrategyCrudService} from "./crud/strategy.crud-service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {TradingStrategy} from "./entities/trading-strategy.entity";
import {TradingStrategyRule} from "./entities/trading-strategy-rule.entity";
import {StrategyRuleCrudController} from "./crud/strategy-rule.crud-controller";
import {StrategyRuleCrudService} from "./crud/strategy-rule.crud-service";
import {StrategyService} from "./strategy.service";
import {BullModule} from "@nestjs/bull";

@Module({
    imports: [TypeOrmModule.forFeature([TradingStrategy, TradingStrategyRule]), BullModule.registerQueue({
        name: 'strategy-update',
    })],
    controllers: [StrategyCrudController, StrategyRuleCrudController],
    providers: [StrategyCrudService, StrategyRuleCrudService, StrategyService],
    exports: [TypeOrmModule, StrategyService]
})
export class StrategyModule {
}
