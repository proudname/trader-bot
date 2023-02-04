import {Column, Entity} from 'typeorm';
import {ProductBaseEntity} from "@shared/product/ProductBaseEntity";

@Entity()
export class PortfolioItem<T = any> extends ProductBaseEntity<T> {
    @Column()
    qty: number;
}
