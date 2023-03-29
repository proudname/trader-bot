import {Module} from '@nestjs/common';
import {PortfolioItemCrudController} from "./crud/portfolio-item.crud-controller";
import {PortfolioItemCrudService} from "./crud/portfolio-item.crud-service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {PortfolioItem} from "./entities/portfolio-item.entity";
import {PortfolioItemService} from "./portfolio-item.service";

@Module({
    imports: [TypeOrmModule.forFeature([PortfolioItem])],
    controllers: [PortfolioItemCrudController],
    providers: [PortfolioItemCrudService, PortfolioItemService]
})
export class PortfolioModule {
}
