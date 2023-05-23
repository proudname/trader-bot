import {Module} from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {CatalogItemCrudController} from "./crud/catalog-item.crud-controller";
import {CatalogItemCrudService} from "./crud/catalog-item.crud-service";
import {CatalogItem} from "./entities/catalog-item.entity";
import {BullModule} from "@nestjs/bull";
import {CatalogProcessor} from "./catalog-item.processor";
import PolygonApi from "@shared/api/polygon.api";
import {HttpModule} from "@nestjs/axios";
import {CatalogService} from "./catalog.service";
import {MarketsModule} from "@markets";

@Module({
    imports: [
        HttpModule,
        BullModule.registerQueue({
            name: 'catalog',
        }),
        TypeOrmModule.forFeature([CatalogItem]),
        MarketsModule,
    ],
    controllers: [CatalogItemCrudController],
    providers: [CatalogItemCrudService, CatalogProcessor, PolygonApi, CatalogService],
})
export class CatalogModule {
}
