import {Inject, Injectable} from '@nestjs/common';
import {TypeOrmCrudService} from "@nestjsx/crud-typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {TradingStrategy} from "./entities/trading-strategy.entity";
import {Repository} from "typeorm";
import {UpdateStrategyDto} from "./dto/update-strategy.dto";
import {Cache} from "cache-manager";
import {getStrategyCacheKey} from "@shared/utils/cache";
import {StrategyStatus} from "@shared/enums";
import {InjectQueue} from "@nestjs/bull";
import {Queue} from "bull";
import {StrategyUpdateJobPayload} from "@markets/strategy-update.processor";

@Injectable()
export class StrategyService extends TypeOrmCrudService<TradingStrategy> {
    constructor(
        @InjectRepository(TradingStrategy) repo: Repository<TradingStrategy>,
        @Inject('CACHE_MANAGER') private cacheManager: Cache,
        @InjectQueue('strategy-update') private strategyUpdateQueue: Queue<StrategyUpdateJobPayload>
    ) {
        super(repo);
    }

    async handleStrategyUpdate(id: number, dto: UpdateStrategyDto): Promise<void> {
        const jobPayload: StrategyUpdateJobPayload = {strategyId: id};
        if ([dto.status, dto.rules, dto.items].some((item) => item !== undefined)) {
            const strategy = await this.repo.findOneBy({id});
            if (!strategy) throw new Error(`Strategy with id ${id} not exists`);
            jobPayload.switchParams = {market: strategy.market, status: strategy.status};
        }
        await this.strategyUpdateQueue.add(jobPayload);
    }

    async loadStrategyForObserve(strategyId: number): Promise<TradingStrategy> {
        const cacheKey = getStrategyCacheKey(strategyId);
        const cachedStrategy = await this.cacheManager.get<TradingStrategy>(cacheKey);

        if (cachedStrategy) return cachedStrategy;

        const strategy = await this.repo.findOne({
            where: {
                id: strategyId,
                status: StrategyStatus.ENABLED
            },
            relations: ['rules', 'items', 'items.items', 'items.items.catalogItem'],
        });

        if (!strategy) throw new Error(`Strategy with id ${strategyId} disabled or not exists`);

        this.cacheManager.set(cacheKey, strategy, 60_000);

        return strategy;
    }

    async* getStrategiesToObserve(): AsyncGenerator<TradingStrategy> {
        const strategies = await this.repo.find({
            where: {
                status: StrategyStatus.ENABLED
            },
            relations: ['rules', 'items', 'items.items', 'items.items.catalogItem'],
        });

        for (const strategy of strategies) {
            this.cacheManager.set(getStrategyCacheKey(strategy.id), strategy, 60_000);
            yield strategy;
        }
    }

}
