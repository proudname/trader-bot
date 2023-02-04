import {Column, Entity, ManyToMany} from "typeorm";
import {SelectionItem} from "./selection-item.entity";
import BaseEntity from "@shared/base.entity";

@Entity()
export class Selection extends BaseEntity {
    @Column()
    name: string;

    @ManyToMany(() => SelectionItem)
    items: SelectionItem[]
}
