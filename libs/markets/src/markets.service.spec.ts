import {Test, TestingModule} from '@nestjs/testing';
import {MarketsService} from './markets.service';
import {HistoryService} from "../../../apps/bot/src/features/history/history.service";
import {PortfolioItemService} from "../../../apps/bot/src/features/portfolio/portfolio-item.service";
import {StrategyService} from "../../../apps/bot/src/features/strategy/strategy.service";
import {DataSource} from "typeorm";

describe('MarketsService', () => {
    let service: MarketsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                MarketsService,
                {
                    provide: HistoryService,
                    useValue: {}
                },
                {
                    provide: PortfolioItemService,
                    useValue: {}
                },
                {
                    provide: StrategyService,
                    useValue: {}
                },
                {
                    provide: DataSource,
                    useValue: {}
                },
            ],
        }).compile();

        service = module.get<MarketsService>(MarketsService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
