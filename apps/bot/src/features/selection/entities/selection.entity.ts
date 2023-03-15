import {Column, Entity, JoinTable, ManyToMany} from "typeorm";
import {SelectionItem} from "./selection-item.entity";
import BaseEntity from "@shared/base.entity";

@Entity()
export class Selection extends BaseEntity {

    @Column()
    name: string;

    @ManyToMany(() => SelectionItem)
    @JoinTable()
    items: SelectionItem[]
}
