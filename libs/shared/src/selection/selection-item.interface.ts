import {ProductBaseEntity} from "@shared/product/ProductBaseEntity";

export interface ISelectionItem<T = any> extends ProductBaseEntity<T> {
    maxQty: number
    targetPrice: number
}
