import {DecideEnum, TradeAction} from '@shared/enums';
import {TradingStrategyRule} from '../features/strategy/entities/trading-strategy-rule.entity';
import {TradingStrategy} from "../features/strategy/entities/trading-strategy.entity";

export interface IBaseEntity {
    id: number
}

export interface ITicker {
    code: string;
    companyName: string;
    figi: string;
    companyDescription: string;
}

export interface ITickerEntity extends IBaseEntity, ITicker {
}

export interface ITradeHistory extends IBaseEntity {
    strategy: TradingStrategy;
    strategyId: number;
    actionType: TradeAction;
    price: number;
    actionDate: Date;
}

export interface IPortfolioItemEntity extends IBaseEntity {
    name: string;
    ticker: number | ITicker;
    cratedAt: Date;
}

export type PolygonTicker = {
    ticker: 'A',
    name: 'Agilent Technologies Inc.',
    market: 'stocks',
    locale: string,
    primary_exchange: 'XNYS',
    type: 'CS',
    active: true,
    currency_name: 'usd',
    cik: '0001090872',
    composite_figi: 'BBG000C2V3D6',
    share_class_figi: 'BBG001SCTQY4',
    last_updated_utc: '2023-03-30T00:00:00Z'
}

export type PolygonTickersResponse = {
    "page": number,
    "perPage": number,
    "count": number,
    "status": "OK" | "ERROR",
    "tickers": PolygonTicker[]
}

export type TinkoffInstrumentInfoMessage = {
    figi: 'BBG000B9XRY4',
    trade_status: 'not_available_for_trading' | 'normal_trading',
    min_price_increment: 0.01,
    lot: 1,
    limit_up: 135.46,
    limit_down: 130.1
}

export type DoNothingDecision = {
    action: DecideEnum.DO_NOTHING
}

export type DoActionDecision = {
    action: DecideEnum,
    price: number,
    qty: number,
    rules: TradingStrategyRule[],
}

export type Decision = DoActionDecision | DoNothingDecision

export type PolygonQuery = {
    page: number,
    search?: string,
    apiKey?: string,
    sort: 'ticker',
    perpage: number
}

export type EntityId = number;
