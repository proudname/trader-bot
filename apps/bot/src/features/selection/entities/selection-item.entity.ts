import {Column, Entity, ManyToOne} from "typeorm";
import {ISelectionItem} from "@shared/selection/selection-item.interface";
import {DBRelation} from "@shared/types";
import {CatalogItem} from "../../catalog/entities/catalog-item.entity";
import BaseEntity from "@shared/base.entity";

@Entity()
export class SelectionItem extends BaseEntity implements ISelectionItem {

    @ManyToOne(() => CatalogItem)
    catalogItem: DBRelation<CatalogItem>

    @Column()
    maxQty: number

    @Column()
    targetPrice: number
}
