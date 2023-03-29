import {Module} from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {CatalogItemCrudController} from "./crud/catalog-item.crud-controller";
import {CatalogItemCrudService} from "./crud/catalog-item.crud-service";
import {CatalogItem} from "./entities/catalog-item.entity";

@Module({
    imports: [TypeOrmModule.forFeature([CatalogItem])],
    controllers: [CatalogItemCrudController],
    providers: [CatalogItemCrudService],
})
export class CatalogModule {
}
