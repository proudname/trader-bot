import {MarketKey} from "@markets/enums";


export class Product<T> {
    title: string;
    markets: MarketKey[];
    meta?: T
}