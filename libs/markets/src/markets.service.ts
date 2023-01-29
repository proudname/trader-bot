import { Injectable } from '@nestjs/common';
import {MarketKey} from "@markets/markets/enums";
import {IMarketService} from "@markets/markets/market-service.interface";

@Injectable()
export class MarketsService {

    markets: Map<MarketKey, IMarketService> = new Map();

    register(key: MarketKey, service: IMarketService) {
        this.markets.set(key, service);
    }

    get(key: MarketKey) {
        this.markets.get(key);
    }
}
