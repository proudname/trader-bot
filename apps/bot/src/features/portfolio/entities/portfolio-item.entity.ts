import {Column, Entity, ManyToOne} from 'typeorm';
import BaseEntity from "@shared/base.entity";
import {DBRelation} from "@shared/types";
import {CatalogItem} from "../../catalog/entities/catalog-item.entity";
import {MarketKey} from "@markets/enums";

@Entity()
export class PortfolioItem extends BaseEntity {

    @ManyToOne(() => CatalogItem)
    catalogItem: DBRelation<CatalogItem>

    @Column({
        type: 'varchar',
        enum: MarketKey,
    })
    market: MarketKey

    @Column()
    qty: number;
}
