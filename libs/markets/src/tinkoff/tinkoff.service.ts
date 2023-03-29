import OpenAPI, {CandleStreaming, FIGI, LimitOrderRequest, PlacedLimitOrder} from '@tinkoff/invest-openapi-js-sdk';
import {Injectable, Logger} from "@nestjs/common";
import {ApplyDecisionParams, IMarketService, ObserveParams, StopObserveParams} from "@markets/market-service.interface";
import {Observable, Subscription, throwError, timeoutWith} from "rxjs";
import {TinkoffInstrumentInfoMessage} from "@markets/tinkoff/types";
import {DoActionDecision} from "@markets/decision-maker";
import {DecideEnum, StrategyStatus} from "@shared/enums";
import {DecisionValidationError} from "@markets/errors/DecisionValidationError";
import {TradingStrategy} from "../../../../apps/bot/src/features/strategy/entities/trading-strategy.entity";
import {ITradingStrategyRule} from "@shared/strategy/trading-strategy-rule.interface";
import _ from "lodash";
import {ISelection} from "@shared/selection/selection.interface";
import {ISelectionItem} from "@shared/selection/selection-item.interface";
import {SelectionItem} from "../../../../apps/bot/src/features/selection/entities/selection-item.entity";
import {MarketsService} from "@markets";
import {MarketKey} from "@markets/enums";
import {ObservablePrice, ObservablesService} from "@markets/observables.service";
import {CatalogItem} from "../../../../apps/bot/src/features/catalog/entities/catalog-item.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";

type TinkoffItemMeta = { code: string, figi: string };

type HandlePriceChangeParams = {
    strategyId: number,
    averagePrice: number,
    targetPrice: number,
    item: SelectionItem
}

@Injectable()
export class TinkoffService implements IMarketService {

    logger = new Logger(TinkoffService.name);
    public api: OpenAPI = new OpenAPI({
        socketURL: process.env.TIN_SOCKET_KEY,
        apiURL: process.env.TINKOFF_API_URL,
        secretToken: process.env.TINKOFF_KEY
    });

    private subscriptions: Map<number, Map<string, Subscription>> = new Map<number, Map<string, Subscription>>();

    constructor(
        private marketsService: MarketsService,
        private observablesService: ObservablesService,
        @InjectRepository(TradingStrategy) private strategyRepository: Repository<TradingStrategy>
    ) {
        marketsService.register(MarketKey.TINKOFF, this);
    }

    async observe(params: ObserveParams): Promise<void> {
        const strategy = await this.loadStrategy(params.strategyId);
        for (const selection of strategy.items as ISelection[]) {
            for (const item of selection.items as ISelectionItem[]) {

                const catalogItem = item.catalogItem as CatalogItem<TinkoffItemMeta>;

                let observer = this.observablesService.get(catalogItem.meta.code);
                if (!observer) {
                    observer = this.observePrice(catalogItem.meta.figi);
                    this.observablesService.set(catalogItem.meta.code, observer)
                }

                const subscription = observer.subscribe((output) => {
                    return this.handlePriceChange({
                        averagePrice: output.averagePrice,
                        targetPrice: item.targetPrice,
                        strategyId: strategy.id,
                        item
                    })
                })

                let strategySubscriptions = this.subscriptions.get(strategy.id);
                if (!strategySubscriptions) {
                    strategySubscriptions = new Map<string, Subscription>();
                }
                if (strategySubscriptions.has(catalogItem.meta.code)) {
                    strategySubscriptions.get(catalogItem.meta.code).unsubscribe();
                }
                strategySubscriptions.set(catalogItem.meta.code, subscription);
                this.subscriptions.set(params.strategyId, strategySubscriptions)
            }
        }
    };

    async handlePriceChange(params: HandlePriceChangeParams) {
        const {averagePrice, targetPrice, strategyId, item} = params;

        // reload strategy from db
        const strategy = await this.loadStrategy(strategyId);

        strategy.rules.map((rule: ITradingStrategyRule) => {
            return this.marketsService.executeOrder({
                rule,
                targetPrice,
                averagePrice,
                item,
                market: MarketKey.TINKOFF
            });
        })
    }

    async loadStrategy(strategyId: number): Promise<TradingStrategy> {
        const strategy = await this.strategyRepository.findOne({
            where: {
                id: strategyId,
                status: StrategyStatus.ENABLED
            },
            relations: ['rules', 'items', 'items.items', 'items.items.catalogItem'],
            cache: 60000,
        });

        if (!strategy) throw new Error(`Strategy with id ${strategy.id} disabled or not exists`);

        return strategy;
    }


    validateFigi(figi: string): Observable<void> {
        const observable = new Observable<void>((subscriber) => {
            this.api.instrumentInfo({figi}, (message: TinkoffInstrumentInfoMessage) => {
                if (message.trade_status === 'normal_trading') {
                    subscriber.complete();
                }
                subscriber.error(
                    new Error(`Ticker can\'t be observed: trade status is ${message.trade_status}`)
                )
            })
        });

        return observable.pipe(
            timeoutWith(
                5000,
                throwError(() => new Error(`Ticker can\'t be observed: timeout has reached`))
            )
        )
    }


    observePrice(figi: string): ObservablePrice {
        return new Observable((subscriber) => {

            this.validateFigi(figi)
                .subscribe({
                    error: (err) => {
                        subscriber.error(err)
                    }
                });

            const unsubscribeFn = this.api.candle({
                figi,
                interval: '1min'
            }, function (candle: CandleStreaming) {
                const averagePrice = Number(_.mean([candle.h, candle.l]));
                subscriber.next({
                    averagePrice
                })
            });

            return () => {
                unsubscribeFn();
            }
        })
    }


    stopObserve(params: StopObserveParams): void {
        while (this.subscriptions.has(params.strategyId)) {
            const strategySubscriptions = this.subscriptions.get(params.strategyId);
            if (strategySubscriptions) {
                for (const [key, value] of strategySubscriptions) {
                    value.unsubscribe();
                    strategySubscriptions.delete(key);
                }
            }
            this.subscriptions.delete(params.strategyId);
        }
    }


    async applyDecision(params: ApplyDecisionParams): Promise<PlacedLimitOrder> {

        const {decision, item} = params;
        const catalogItem = item.catalogItem as CatalogItem<TinkoffItemMeta>;

        const {
            qty,
            action,
        } = await this.adjustDecision(decision, catalogItem.meta.figi);

        const orderData: LimitOrderRequest & FIGI = {
            figi: catalogItem.meta.figi,
            operation: action === DecideEnum.BUY ? "Buy" : "Sell",
            lots: qty,
            price: Math.floor(decision.sum * 100) / 100
        };

        return this.api.limitOrder(orderData);
    }

    async adjustDecision(decision: DoActionDecision, figi: string): Promise<DoActionDecision> {
        const resultDecision = {...decision};
        if (decision.action === DecideEnum.SELL) {
            const instrument = await this.api.instrumentPortfolio({figi});
            if (!instrument) throw new DecisionValidationError(`Stock with figi ${figi} not found in portfolio`);
            const allowedLots = instrument.blocked ? instrument.lots - instrument.blocked : instrument.lots;
            if (allowedLots < 1) throw new DecisionValidationError(`There is no free lots to sell. All: ${instrument.lots}, Blocked: ${instrument.blocked}`);
            if (allowedLots < decision.qty) {
                resultDecision.qty = allowedLots;
            }
        }
        return resultDecision;
    }

    getSubscriptions(): Map<number, Map<string, Subscription>> {
        return this.subscriptions;
    }
}