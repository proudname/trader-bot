import {ITradingStrategyRule} from "@shared/strategy/trading-strategy-rule.interface";
import {DecideEnum, TradeAction} from "@shared/enums";
import {getSumByPercent} from "@shared/utils/math.util";
import assertNever from "assert-never/index";

type DecisionMakerConstructorParams = {
    rule: ITradingStrategyRule,
    averagePrice: number,
    targetPrice: number,
}

export type DoNothingDecision = {
    action: DecideEnum.DO_NOTHING
}

export type DoActionDecision = {
    action: DecideEnum.BUY | DecideEnum.SELL,
    qty: number,
    sum: number,
}

export type AffectedRule = {
    rule: ITradingStrategyRule,
    sum: number,
}

export type Decision = DoActionDecision | DoNothingDecision

export class DecisionMaker {

    rule: ITradingStrategyRule;
    averagePrice: number;
    targetPrice: number;

    constructor(params: DecisionMakerConstructorParams) {
        this.rule = params.rule;
        this.targetPrice = params.targetPrice;
        this.averagePrice = params.averagePrice;
    }

    async makeDecision(): Promise<Decision> {
        const {
            rule,
            targetPrice,
        } = this;

        // const decision = rules.reduce<FilterRulesResult>((decision, rule) => {
        //     const sum = getSumByPercent(this.targetPrice, rule.change);
        //     if (!this.checkIfRuleShouldBeUsed(sum, rule.action)) return decision;
        //     return {
        //         affectedRules: [...decision.affectedRules, {rule, sum}],
        //         qty: rule.action === TradeAction.BUY
        //             ? decision.qty + rule.qty
        //             : decision.qty - rule.qty
        //     };
        // }, {affectedRules: [], qty: 0});


        const maxQty = rule.qty - rule.used;
        const tradeSum = getSumByPercent(targetPrice, rule.change);

        if (!this.checkIfRuleShouldBeUsed(tradeSum, rule.action) && maxQty < 1) {
            return {
                action: DecideEnum.DO_NOTHING
            }
        }

        return {
            action: rule.action === TradeAction.BUY ? DecideEnum.BUY : DecideEnum.SELL,
            qty: maxQty,
            sum: tradeSum,
        };
    }

    checkIfRuleShouldBeUsed = (tradeRuleSum: number, action: TradeAction): boolean => {
        const {averagePrice} = this;
        switch (action) {
            case TradeAction.BUY:
                return tradeRuleSum >= averagePrice;
            case TradeAction.SELL:
                return tradeRuleSum < averagePrice;
            default:
                return assertNever(action);
        }
    }
}
