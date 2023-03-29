import {Column, Entity, JoinTable, ManyToMany} from "typeorm";
import {SelectionItem} from "./selection-item.entity";
import {MarketKey} from "@markets/enums";
import {ISelection} from "@shared/selection/selection.interface";
import BaseEntity from "@shared/base.entity";

@Entity()
export class Selection extends BaseEntity implements ISelection {

    @Column()
    name: string;

    @Column({
        type: 'varchar',
        enum: MarketKey
    })
    market: MarketKey;

    @ManyToMany(() => SelectionItem)
    @JoinTable()
    items: SelectionItem[]
}
