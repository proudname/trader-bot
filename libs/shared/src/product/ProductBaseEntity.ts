import {MarketKey} from "@markets/enums";
import {Product} from "@shared/product/Product";
import {Column} from "typeorm";
import BaseEntity from "@shared/base.entity";


export class ProductBaseEntity<T> extends BaseEntity implements Product<T> {
    @Column()
    title: string;

    @Column({
        type: 'text',
        array: true
    })
    markets: MarketKey[];

    @Column({
        type: 'jsonb',
        nullable: true
    })
    meta?: T
}