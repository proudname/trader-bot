import {MarketKey} from "@markets/enums";


export class Product<T> {
    title: string;
    market: MarketKey;
    meta?: T
}