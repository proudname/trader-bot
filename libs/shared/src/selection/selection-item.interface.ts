import {DBRelation} from "@shared/types";
import {CatalogItem} from "../../../../apps/bot/src/features/catalog/entities/catalog-item.entity";

export interface ISelectionItem {
    id: number;
    catalogItem: DBRelation<CatalogItem>
    maxQty: number
    targetPrice: number
}
