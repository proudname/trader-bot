import {Module} from '@nestjs/common';
import {MarketsService} from './markets.service';
import {TinkoffService} from "@markets/tinkoff/tinkoff.service";
import {ObservablesService} from "@markets/observables.service";
import {StrategyModule} from "../../../apps/bot/src/features/strategy/trade.module";

@Module({
    imports: [StrategyModule],
    providers: [MarketsService, TinkoffService, ObservablesService],
    exports: [MarketsService],
})
export class MarketsModule {
}
