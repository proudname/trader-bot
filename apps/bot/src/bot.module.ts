import { Module } from '@nestjs/common';
import { HistoryModule } from './features/history/history.module';
import { PortfolioModule } from './features/portfolio/portfolio.module';
import {StrategyModule} from './features/strategy/trade.module';
import {UserModule} from "./features/user/user.module";
import {AuthModule} from "./features/auth/auth.module";
import {TypeOrmModule} from "@nestjs/typeorm";

@Module({
  imports: [HistoryModule, PortfolioModule, UserModule, StrategyModule, AuthModule, TypeOrmModule.forRoot()],
  controllers: [],
  providers: [],
})
export class BotModule {}
