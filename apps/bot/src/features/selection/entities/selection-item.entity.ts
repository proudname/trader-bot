import {ProductBaseEntity} from "@shared/product/ProductBaseEntity";
import {Column, Entity} from "typeorm";

@Entity()
export class SelectionItem<T = any> extends ProductBaseEntity<T> {
    @Column()
    maxQty: number
}
