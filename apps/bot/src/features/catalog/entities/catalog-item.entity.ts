import {ProductBaseEntity} from "@shared/product/ProductBaseEntity";
import {Entity} from "typeorm";

@Entity()
export class CatalogItem<T = any> extends ProductBaseEntity<T> {
}
