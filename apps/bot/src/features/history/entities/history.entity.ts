import {Column, CreateDateColumn, Entity, JoinColumn, ManyToOne} from "typeorm";
import {TradingStrategyRule} from "../../strategy/entities/trading-strategy-rule.entity";
import {SelectionItem} from "../../selection/entities/selection-item.entity";
import BaseEntity from "@shared/base.entity";
import {ISelectionItem} from "@shared/selection/selection-item.interface";
import {ITradingStrategyRule} from "@shared/strategy/trading-strategy-rule.interface";

@Entity()
export class History extends BaseEntity {
    @ManyToOne(() => TradingStrategyRule)
    @JoinColumn()
    rule: ITradingStrategyRule;

    @Column()
    qty: number;

    @ManyToOne(() => SelectionItem)
    @JoinColumn()
    item: ISelectionItem;

    @Column({type: "decimal"})
    price: number;

    @Column()
    result: string;

    @CreateDateColumn()
    createdAt: Date;
}
