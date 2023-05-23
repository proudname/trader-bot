import {Module} from '@nestjs/common';
import {MarketsService} from './markets.service';
import {TinkoffService} from "@markets/tinkoff/tinkoff.service";
import {ObservablesService} from "@markets/observables.service";
import {StrategyModule} from "../../../apps/bot/src/features/strategy/strategy.module";
import {HistoryModule} from "../../../apps/bot/src/features/history/history.module";
import {PortfolioModule} from "../../../apps/bot/src/features/portfolio/portfolio.module";
import {BullModule} from "@nestjs/bull";
import {StrategyUpdateProcessor} from "@markets/strategy-update.processor";

@Module({
    imports: [HistoryModule, StrategyModule, PortfolioModule, BullModule.registerQueue({
        name: 'strategy-update',
    })],
    providers: [TinkoffService, MarketsService, ObservablesService, StrategyUpdateProcessor],
    exports: [MarketsService],
})
export class MarketsModule {
    constructor(
        private readonly marketsService: MarketsService,
    ) {
        this.marketsService.initializeObservers();
    }
}
