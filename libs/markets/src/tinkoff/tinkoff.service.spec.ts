import {Test, TestingModule} from '@nestjs/testing';
import {TinkoffService} from './tinkoff.service';
import {MarketsService} from "@markets";
import {MarketKey} from "@markets/enums";
import {DecideEnum, StrategyStatus, TradeAction, TradingRuleStatus} from "@shared/enums";
import {ObservablesService} from "@markets/observables.service";
import {getRepositoryToken} from "@nestjs/typeorm";
import {TradingStrategy} from "../../../../apps/bot/src/features/strategy/entities/trading-strategy.entity";

let limitOrderFn;
let candleFn;

jest.mock('@tinkoff/invest-openapi-js-sdk', () => {
    return {
        __esModule: true,
        default: jest.fn().mockImplementation(() => {
            return {
                limitOrder: limitOrderFn,
                instrumentInfo: (params: any, cb: (mes: any) => any) => {
                    cb({
                        trade_status: 'normal_trading',
                    });
                },
                candle: candleFn
            };
        }),
    };
});

describe('TinkoffService', () => {
    let service: TinkoffService;
    let executeFn;

    beforeEach(async () => {
        executeFn = jest.fn();
        limitOrderFn = jest.fn();
        candleFn = jest.fn().mockImplementation(() => jest.fn())

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                TinkoffService,
                ObservablesService,
                {
                    provide: MarketsService,
                    useValue: {
                        register: jest.fn(),
                        executeOrder: executeFn
                    }
                },
                {
                    provide: getRepositoryToken(TradingStrategy),
                    useValue: {}
                }
            ],
        }).compile();

        service = module.get<TinkoffService>(TinkoffService);

        jest.spyOn(service, 'loadStrategy').mockImplementation(async (): Promise<any> => {
            return {
                id: 1,
                name: 'test',
                status: StrategyStatus.ENABLED,
                items: [
                    {
                        id: 1,
                        market: MarketKey.TINKOFF,
                        items: [
                            {
                                id: 1,
                                title: 'Test2',
                                meta: {code: 'Test2', figi: 'Test2'},
                                targetPrice: 100,
                                maxQty: 10,
                            },
                            {
                                id: 1,
                                title: 'Test3',
                                meta: {code: 'Test3', figi: 'Test3'},
                                targetPrice: 100,
                                maxQty: 10,
                            },
                        ]
                    }],
                rules: [
                    {
                        id: 1,
                        change: -10,
                        qty: 10,
                        used: 5,
                        status: TradingRuleStatus.ACTIVE,
                        strategy: 1,
                        action: TradeAction.BUY
                    },
                    {
                        id: 1,
                        change: -10,
                        qty: 10,
                        used: 5,
                        status: TradingRuleStatus.ACTIVE,
                        strategy: 1,
                        action: TradeAction.BUY
                    },
                    {
                        id: 1,
                        change: -10,
                        qty: 10,
                        used: 5,
                        status: TradingRuleStatus.ACTIVE,
                        strategy: 1,
                        action: TradeAction.BUY
                    },
                    {
                        id: 1,
                        change: -10,
                        qty: 10,
                        used: 5,
                        status: TradingRuleStatus.ACTIVE,
                        strategy: 1,
                        action: TradeAction.BUY
                    }
                ]
            }
        })
    });

    afterEach(() => {
        jest.clearAllMocks();
    })

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should call executeOrder method', async () => {
        await service.handlePriceChange({
            averagePrice: 100,
            targetPrice: 100,
            strategyId: 1,
            item: {
                id: 1,
                title: 'Test2',
                meta: {code: 'Test2', figi: 'Test2'},
                targetPrice: 100,
                maxQty: 10,
            } as any,
        })
        expect(executeFn).toHaveBeenCalledTimes(4);
    });

    it('should call applyDecision method', async () => {
        await service.applyDecision({
            decision: {
                action: DecideEnum.BUY,
                qty: 10,
                sum: 100
            },
            item: {
                id: 1,
                title: 'Test2',
                meta: {code: 'Test2', figi: 'Test2'},
                targetPrice: 100,
                maxQty: 10,
            } as any
        })

        expect(limitOrderFn).toHaveBeenCalled();
    });


    it('should call observe method', async () => {
        await service.observe({strategyId: 1});

        expect(candleFn).toHaveBeenCalledTimes(2);

        const subscriptions = service.getSubscriptions();
        expect(subscriptions.size).toBe(1);
        expect(subscriptions.get(1).size).toBe(2);

    });

    it('should call stopObserve method', async () => {
        await service.observe({strategyId: 1});
        await service.stopObserve({strategyId: 1});

        const subscriptions = service.getSubscriptions();
        expect(subscriptions.size).toBe(0);
    });

});
