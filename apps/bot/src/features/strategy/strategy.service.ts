import {Inject, Injectable} from '@nestjs/common';
import {TypeOrmCrudService} from "@nestjsx/crud-typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {TradingStrategy} from "./entities/trading-strategy.entity";
import {Repository} from "typeorm";
import {UpdateStrategyDto} from "./dto/update-strategy.dto";
import {Cache} from "cache-manager";
import {getStrategyCacheKey} from "@shared/utils/cache";
import {StrategyStatus} from "@shared/enums";

@Injectable()
export class StrategyService extends TypeOrmCrudService<TradingStrategy> {
    constructor(
        @InjectRepository(TradingStrategy) repo: Repository<TradingStrategy>,
        @Inject('CACHE_MANAGER') private cacheManager: Cache,
    ) {
        super(repo);
    }

    async handleStrategyUpdate(id: number, dto: UpdateStrategyDto): Promise<void> {
        if ([dto.status, dto.rules, dto.items].some((item) => item !== undefined)) {
            await this.cacheManager.del(getStrategyCacheKey(id));
        }
    }

    async loadStrategy(strategyId: number): Promise<TradingStrategy> {
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

        if (!strategy) throw new Error(`Strategy with id ${strategy.id} disabled or not exists`);

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
