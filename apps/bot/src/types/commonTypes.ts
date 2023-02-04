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
    "ticker": "AAPL",
    "name": "Apple Inc.",
    "market": "STOCKS",
    "locale": "US",
    "currency": "USD",
    "active": true,
    "primaryExch": "NGS",
    "type": "cs",
    "codes"?: {
        "cik": "0000320193",
        "figiuid": "EQ0010169500001000",
        "scfigi": "BBG001S5N8V8",
        "cfigi": "BBG000B9XRY4",
        "figi": "BBG000B9Y5X2"
    },
    "attrs"?: {
        "currencyName": "Australian dollar,",
        "currency": "AUD,",
        "baseName": "United Arab Emirates dirham,",
        "base": "AED"
    },
    "updated": "2019-01-15T00:00:00.000Z",
    "url": "https://api.polygon.io/v2/reference/tickers/AAPL"
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

export type DBRelation<T, I = number> = T | I | null

export type EntityId = number;
