import {Module} from '@nestjs/common';
import {PortfolioItemCrudController} from "./crud/portfolio-item.crud-controller";
import {PortfolioItemCrudService} from "./crud/portfolio-item.crud-service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {PortfolioItem} from "./entities/portfolio-item.entity";

@Module({
    imports: [TypeOrmModule.forFeature([PortfolioItem])],
    controllers: [PortfolioItemCrudController],
    providers: [PortfolioItemCrudService]
})
export class PortfolioModule {
}
