import {Column, Entity, ManyToOne} from 'typeorm';
import {TradingStrategy} from './trading-strategy.entity';
import BaseEntity from '@shared/base.entity';
import {TradeAction, TradingRuleStatus} from "@shared/enums";
import {DBRelation} from "@shared/types";
import {ITradingStrategyRule} from "@shared/strategy/trading-strategy-rule.interface";

@Entity()
export class TradingStrategyRule extends BaseEntity implements ITradingStrategyRule {

    @Column({type: 'float'})
    change: number;

    @Column({type: 'int'})
    qty: number;

    @Column({type: 'int', default: 0})
    used: number;

    @Column({type: 'varchar', default: TradingRuleStatus.ACTIVE, enum: TradingRuleStatus})
    status: TradingRuleStatus;

    @ManyToOne(() => TradingStrategy, strategy => strategy.rules, {
        onDelete: 'CASCADE',
    })
    strategy: DBRelation<TradingStrategy>;

    @Column({type: 'varchar', enum: TradeAction})
    action: TradeAction

}