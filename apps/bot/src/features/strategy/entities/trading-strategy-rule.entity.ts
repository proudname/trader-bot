import {Column, Entity, ManyToOne} from 'typeorm';
import {TradingStrategy} from './trading-strategy.entity';
import BaseEntity from '@shared/base.entity';
import {DBRelation} from "../../../types";
import {TradeAction, TradingRuleStatus} from "@shared/enums";

@Entity()
export class TradingStrategyRule extends BaseEntity {

    @Column({type: 'float'})
    change: number;

    @Column({type: 'varchar', default: TradingRuleStatus.ACTIVE, enum: TradingRuleStatus})
    status: TradingRuleStatus;

    @ManyToOne(() => TradingStrategy, strategy => strategy.rules)
    strategy: DBRelation<TradingStrategy>;

    @Column({type: 'varchar', enum: TradeAction})
    action: TradeAction

}