import {ProductBaseEntity} from "@shared/product/ProductBaseEntity";
import {Column, Entity} from "typeorm";
import {ISelectionItem} from "@shared/selection/selection-item.interface";

@Entity()
export class SelectionItem<T = any> extends ProductBaseEntity<T> implements ISelectionItem<T> {
    @Column()
    maxQty: number

    @Column()
    targetPrice: number
}
