import {Module} from '@nestjs/common';
import {HistoryModule} from './history/history.module';
import {PortfolioModule} from './portfolio/portfolio.module';
import {StrategyModule} from './strategy/trade.module';
import {UserModule} from "./user/user.module";
import {AuthModule} from "./auth/auth.module";
import {SelectionModule} from './selection/selection.module';

@Module({
    imports: [HistoryModule, PortfolioModule, UserModule, StrategyModule, AuthModule, SelectionModule],
})
export class FeaturesModule {
}
