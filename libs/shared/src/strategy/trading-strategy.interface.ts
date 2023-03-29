import {StrategyStatus} from "@shared/enums";
import {DBRelation} from "@shared/types";
import {ITradingStrategyRule} from "@shared/strategy/trading-strategy-rule.interface";
import {MarketKey} from "@markets/enums";
import {ISelection} from "@shared/selection/selection.interface";

export interface ITradingStrategy {

    id: number;

    name: string;

    market: MarketKey;

    items: DBRelation<ISelection>[];

    rules: DBRelation<ITradingStrategyRule>[];

    status: StrategyStatus;

    createdAt: Date;

    updatedAt: Date;
}
