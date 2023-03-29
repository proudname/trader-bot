import {Injectable} from '@nestjs/common';
import {MarketKey} from "@markets/enums";
import {IMarketService} from "@markets/market-service.interface";
import {ITradingStrategyRule} from "@shared/strategy/trading-strategy-rule.interface";
import {SelectionItem} from "../../../apps/bot/src/features/selection/entities/selection-item.entity";
import {TradingStrategyRule} from "../../../apps/bot/src/features/strategy/entities/trading-strategy-rule.entity";
import {DecisionMaker} from "@markets/decision-maker";
import {DecideEnum} from "@shared/enums";
import {PortfolioItem} from "../../../apps/bot/src/features/portfolio/entities/portfolio-item.entity";
import {History} from "../../../apps/bot/src/features/history/entities/history.entity";
import {HistoryService} from "../../../apps/bot/src/features/history/history.service";
import {PortfolioItemService} from "../../../apps/bot/src/features/portfolio/portfolio-item.service";
import {DataSource} from "typeorm";

type ExecuteOrderParams = {
    rule: ITradingStrategyRule,
    targetPrice: number,
    item: SelectionItem,
    averagePrice: number,
    market: MarketKey
}

@Injectable()
export class MarketsService {

    markets: Map<MarketKey, IMarketService> = new Map();

    constructor(
        private historyService: HistoryService,
        private portfolioService: PortfolioItemService,
        private dataSource: DataSource
    ) {
    }

    register(key: MarketKey, service: IMarketService) {
        this.markets.set(key, service);
    }

    get(key: MarketKey) {
        this.markets.get(key);
    }

    async executeOrder({rule, targetPrice, averagePrice, item, market}: ExecuteOrderParams) {

        const service = this.markets.get(market);

        const queryRunner = this.dataSource.createQueryRunner();

        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {

            const actualRule = await queryRunner.manager.findOneBy<ITradingStrategyRule>(TradingStrategyRule, {
                id: rule.id
            });

            if (!actualRule) throw new Error(`Rule with id ${rule.id} not found`);

            const decision = await new DecisionMaker({
                rule,
                targetPrice,
                averagePrice,
            }).makeDecision();

            if (decision.action === DecideEnum.DO_NOTHING) {
                await queryRunner.rollbackTransaction();
                return;
            }

            const {orderId, executedLots} = await service.applyDecision({decision, item});

            actualRule.qty += executedLots;
            await queryRunner.manager.save(actualRule);

            let actualPortfolioItem = await queryRunner.manager.findOneBy<PortfolioItem>(PortfolioItem, {
                catalogItem: item.catalogItem as number,
            });

            if (!actualPortfolioItem) {
                actualPortfolioItem = new PortfolioItem();
                actualPortfolioItem.catalogItem = item.catalogItem as number;
                actualPortfolioItem.market = market;
            }

            actualPortfolioItem.qty += executedLots;
            await queryRunner.manager.save(actualPortfolioItem);

            const historyRecord = new History();
            historyRecord.item = item;
            historyRecord.qty = executedLots;
            historyRecord.rule = rule;
            historyRecord.result = orderId;
            historyRecord.price = targetPrice;
            await queryRunner.manager.save(historyRecord);


            await queryRunner.commitTransaction();
        } catch (err) {
            const historyRecord = new History();
            historyRecord.item = item;
            historyRecord.qty = 0;
            historyRecord.rule = rule;
            historyRecord.result = err.message || 'Unknown error';
            historyRecord.price = targetPrice;
            await queryRunner.manager.save(historyRecord);
            // since we have errors lets rollback the changes we made
            await queryRunner.rollbackTransaction();
        } finally {
            // you need to release a queryRunner which was manually instantiated
            await queryRunner.release();
        }

    }
}
