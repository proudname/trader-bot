import {OnQueueActive, OnQueueCompleted, OnQueueError, Process, Processor} from '@nestjs/bull';
import {CACHE_MANAGER, Inject, Logger} from '@nestjs/common';
import {Job} from 'bull';
import {MarketsService} from "@markets/markets.service";
import {MarketKey} from "@markets/enums";
import {StrategyStatus} from "@shared/enums";
import {getStrategyCacheKey} from "@shared/utils/cache";
import {Cache} from "cache-manager";

export type StrategyUpdateJobPayload = { strategyId: number, switchParams?: { market: MarketKey, status: StrategyStatus } };

@Processor('strategy-update')
export class StrategyUpdateProcessor {

    private readonly logger = new Logger(StrategyUpdateProcessor.name);

    constructor(
        private marketsService: MarketsService,
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
    ) {
    }

    @OnQueueActive()
    onActive() {
        this.logger.log('Update market service by strategy has started');
    }

    @OnQueueCompleted()
    async onCompleted() {
        this.logger.log('Update market service by strategy has ended');
        await this.cacheManager.del('tickers_last_page')
    }

    @OnQueueError()
    onError(error: Error) {
        this.logger.log(`Error on updating market service by strategy: ${error}`);
    }

    @Process()
    async handleUpdate(job: Job<StrategyUpdateJobPayload>) {
        const {strategyId, switchParams} = job.data;
        await this.cacheManager.del(getStrategyCacheKey(strategyId));
        if (switchParams) {
            const marketService = this.marketsService.get(switchParams.market);
            switch (switchParams.status) {
                case StrategyStatus.ENABLED:
                    await marketService.observe({strategyId});
                    break;
                case StrategyStatus.DISABLED:
                    await marketService.stopObserve({strategyId});
            }
        }
    }

}
