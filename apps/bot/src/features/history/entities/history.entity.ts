import {Column, ManyToOne} from "typeorm";
import {TradingStrategy} from "../../strategy/entities/trading-strategy.entity";
import {TradeAction, TradingRuleActionType} from "@shared/enums";

export class History {
    @ManyToOne(() => TradingStrategy)
    strategy: TradingStrategy;

    @Column({ type: "decimal" })
    price: number;

    @Column({ enum: TradeAction })
    actionType: TradeAction;

    @Column({ enum: TradingRuleActionType })
    ruleType: TradingRuleActionType;

    @Column({ default: () => 'CURRENT_TIMESTAMP', type: 'timestamp' })
    actionDate: Date;
}
