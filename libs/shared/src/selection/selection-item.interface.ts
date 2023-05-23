import {DBRelation} from "@shared/types";
import {CatalogItem} from "../../../../apps/bot/src/features/catalog/entities/catalog-item.entity";
import {Selection} from "../../../../apps/bot/src/features/selection/entities/selection.entity";

export interface ISelectionItem {
    id: number;
    catalogItem: DBRelation<CatalogItem>
    maxQty: number
    targetPrice: number
    selection: DBRelation<Selection>
}
