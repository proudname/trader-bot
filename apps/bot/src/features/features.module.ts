import {Module} from '@nestjs/common';
import {HistoryModule} from './history/history.module';
import {PortfolioModule} from './portfolio/portfolio.module';
import {StrategyModule} from './strategy/strategy.module';
import {AuthModule} from "./auth/auth.module";
import {SelectionModule} from './selection/selection.module';
import {CatalogModule} from "./catalog/catalog.module";
import {MarketsModule} from "@markets";

@Module({
    imports: [
        HistoryModule,
        PortfolioModule,
        StrategyModule,
        AuthModule,
        SelectionModule,
        CatalogModule,
        MarketsModule
    ],
})
export class FeaturesModule {
}
