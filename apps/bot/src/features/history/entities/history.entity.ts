import {Column, CreateDateColumn, Entity, JoinColumn, ManyToOne} from "typeorm";
import {TradingStrategyRule} from "../../strategy/entities/trading-strategy-rule.entity";
import {SelectionItem} from "../../selection/entities/selection-item.entity";
import BaseEntity from "@shared/base.entity";

@Entity()
export class History extends BaseEntity {
    @ManyToOne(() => TradingStrategyRule)
    @JoinColumn()
    rule: TradingStrategyRule;

    @ManyToOne(() => SelectionItem)
    @JoinColumn()
    item: SelectionItem;

    @Column({type: "decimal"})
    price: number;

    @CreateDateColumn()
    createdAt: Date;
}
