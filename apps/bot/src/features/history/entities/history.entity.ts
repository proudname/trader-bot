import {Column, Entity, ManyToOne} from "typeorm";
import {TradeAction} from "@shared/enums";
import {TradingStrategyRule} from "../../strategy/entities/trading-strategy-rule.entity";
import {SelectionItem} from "../../selection/entities/selection-item.entity";
import BaseEntity from "@shared/base.entity";

@Entity()
export class History extends BaseEntity {
    @ManyToOne(() => TradingStrategyRule)
    rule: TradingStrategyRule;

    @ManyToOne(() => SelectionItem)
    item: SelectionItem;

    @Column({type: "decimal"})
    price: number;

    @Column({type: 'varchar', enum: TradeAction})
    actionType: TradeAction;

    @Column({default: () => 'CURRENT_TIMESTAMP', type: 'timestamp'})
    actionDate: Date;
}
