import {TradeAction, TradingRuleStatus} from "@shared/enums";
import {DBRelation} from "@shared/types";
import {ITradingStrategy} from "@shared/strategy/trading-strategy.interface";

export interface ITradingStrategyRule {

    id: number;

    change: number;

    qty: number;

    used: number;

    status: TradingRuleStatus;

    strategy: DBRelation<ITradingStrategy>;

    action: TradeAction

}