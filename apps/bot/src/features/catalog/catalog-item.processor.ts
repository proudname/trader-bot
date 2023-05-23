import {OnQueueActive, OnQueueCompleted, OnQueueError, Process, Processor} from '@nestjs/bull';
import {CACHE_MANAGER, Inject, Logger} from '@nestjs/common';
import {promisify} from 'util';
import {Cache} from 'cache-manager';
import {CatalogItem} from "./entities/catalog-item.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {ArrayContains, Repository} from "typeorm";
import {MarketsService} from "@markets";

const delay = promisify(setTimeout);

@Processor('catalog')
export class CatalogProcessor {

    private readonly logger = new Logger(CatalogProcessor.name);

    constructor(
        @InjectRepository(CatalogItem) private catalogItemRepository: Repository<CatalogItem>,
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
        private marketsService: MarketsService,
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
        for (const market of this.marketsService.markets.values()) {
            for await (const item of market.loadItems()) {
                const catalogItem = await this.catalogItemRepository.findOne({
                    where: {
                        title: item.title,
                        markets: ArrayContains(item.markets)
                    }
                })
                if (catalogItem) {
                    item.id = catalogItem.id;
                }
                console.log(item, 'save item');
                await this.catalogItemRepository.save(item);
                await delay(200);
            }
        }
    }
}
