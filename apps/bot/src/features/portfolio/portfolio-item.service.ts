import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {PortfolioItem} from "./entities/portfolio-item.entity";
import {Repository} from "typeorm";

@Injectable()
export class PortfolioItemService {
    constructor(
        @InjectRepository(PortfolioItem) private repository: Repository<PortfolioItem>
    ) {
    }

    async addItem(itemData: Pick<PortfolioItem, 'title' | 'market' | 'meta' | 'qty'>) {
        const item = new PortfolioItem();
        Object.assign(item, itemData);
        const existItem = await this.repository.findOne({
            where: {
                market: item.market,
                title: item.title
            }
        });
        if (existItem) {
            existItem.qty += item.qty;
            return this.repository.save(existItem);
        }
        return this.repository.save(item);
    }
}
