import {Injectable} from "@nestjs/common";
import {IMarketService} from "@markets/markets/market-service.interface";
import {MarketsService} from "@markets/markets";
import {MarketKey} from "@markets/markets/enums";

@Injectable()
export class TinkoffService implements IMarketService {

    constructor(private marketService: MarketsService) {
        marketService.register(MarketKey.TINKOFF, this)
    }

    getItem() {}

    findItems() {}

    handlePriceChange() {}

    observePrice() {}

    getPortfolioItem() {}
}