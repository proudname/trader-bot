import {OnQueueActive, OnQueueCompleted, OnQueueError, Process, Processor} from '@nestjs/bull';
import {CACHE_MANAGER, Inject, Logger} from '@nestjs/common';
import {promisify} from 'util';
import {Cache} from 'cache-manager';
import {plainToClass} from "class-transformer";
import _ from "lodash";
import {PolygonTicker} from "../../types";
import PolygonApi from "@shared/api/polygon.api";
import {CatalogItem} from "./entities/catalog-item.entity";
import {MarketKey} from "@markets/enums";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";

const delay = promisify(setTimeout);

@Processor('catalog')
export class CatalogProcessor {

    // cached last page number ttl, 1 day
    pageTTL = 60 * 60 * 24;

    requestDelay = 100;
    private readonly logger = new Logger(CatalogProcessor.name);

    constructor(
        @InjectRepository(CatalogItem) private catalogItemRepository: Repository<CatalogItem>,
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
        private polygonApi: PolygonApi
    ) {
    }

    @OnQueueActive()
    onActive() {
        this.logger.log('Update catalog task has started');
    }

    @OnQueueCompleted()
    async onCompleted() {
        this.logger.log('Update catalog task has ended');
        await this.cacheManager.del('tickers_last_page')
    }

    @OnQueueError()
    onError(error: Error) {
        this.logger.log(`Error on updating catalog: ${error}`);
    }

    @Process()
    async load() {
        const startPage = await this.cacheManager.get<number>('tickers_last_page') || 1;
        for await (const loadedTicker of this.loadPage(startPage)) {
            await this.handleUploadedTicker(loadedTicker)
            await delay(this.requestDelay);
        }
    }

    checkIsUploadFinished = ({count, perPage}, currentPage): boolean => {
        const pages = Math.ceil(count / perPage);
        return currentPage > pages;
    }

    async* loadPage(start: number) {
        const payload = {
            perpage: 100,
            page: start,
            apiKey: process.env.POLYGON_KEY
        }

        while (payload.page) {
            const data = await this.polygonApi.makeLoadTickerListQuery(payload);
            if (!data) return;
            for (const ticker of data.tickers) yield ticker;
            if (this.checkIsUploadFinished(data, payload.page)) return;
            // we can continue uploading from the last page even server goes down
            await this.cacheManager.set('tickers_last_page', ++payload.page, this.pageTTL)
        }
    }

    async handleUploadedTicker(loadedTicker: PolygonTicker): Promise<void> {

        const {
            codes,
            ticker: tickerName,
            name: companyName
        } = loadedTicker;

        const cfigi = _.get(codes, 'cfigi');
        // cfigi field used by tinkoff investments
        if (!cfigi) return;

        const item = await this.catalogItemRepository.findOne({
            where: {
                meta: {
                    figi: cfigi
                }
            }
        })

        const catalogItem = plainToClass(CatalogItem, {
            id: item?.id,
            title: tickerName,
            markets: [MarketKey.TINKOFF],
            meta: {
                figi: cfigi,
                companyName,
            }
        })
        await this.catalogItemRepository.save(catalogItem)

    }
}
