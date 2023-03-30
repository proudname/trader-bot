import {Module} from '@nestjs/common';
import {MarketsService} from './markets.service';
import {TinkoffService} from "@markets/tinkoff/tinkoff.service";
import {ObservablesService} from "@markets/observables.service";
import {StrategyModule} from "../../../apps/bot/src/features/strategy/strategy.module";
import {ConfigService} from "@nestjs/config";
import {HistoryModule} from "../../../apps/bot/src/features/history/history.module";
import {PortfolioModule} from "../../../apps/bot/src/features/portfolio/portfolio.module";

@Module({
    imports: [HistoryModule, PortfolioModule, StrategyModule, ConfigService],
    providers: [MarketsService, TinkoffService, ObservablesService],
    exports: [MarketsService],
})
export class MarketsModule {
    constructor(
        private readonly marketsService: MarketsService,
    ) {
        this.marketsService.initializeObservers();
    }
}
