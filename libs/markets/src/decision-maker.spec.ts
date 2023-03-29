import {DecisionMaker, DoActionDecision} from "@markets/decision-maker";
import {TradeAction, TradingRuleStatus} from "@shared/enums";

describe('DecisionMaker', () => {

    it('should make buy decision', async () => {
        const decisionMaker = new DecisionMaker({
            rule: {
                id: 1,
                change: 10,
                qty: 5,
                used: 1,
                status: TradingRuleStatus.ACTIVE,
                strategy: 1,
                action: TradeAction.BUY
            },
            averagePrice: 110,
            targetPrice: 100
        });
        const decision = await decisionMaker.makeDecision();
        expect(decision).toHaveProperty('action', TradeAction.BUY);
        expect(decision).toHaveProperty('qty', 4);
        expect((decision as DoActionDecision).sum).toBeCloseTo(110);
    });

    it('should make sell decision', async () => {
        const decisionMaker = new DecisionMaker({
            rule: {
                id: 1,
                change: -10,
                qty: 8,
                used: 7,
                status: TradingRuleStatus.ACTIVE,
                strategy: 1,
                action: TradeAction.SELL
            },
            averagePrice: 100,
            targetPrice: 110
        });
        const decision = await decisionMaker.makeDecision();
        expect(decision).toHaveProperty('action', TradeAction.SELL);
        expect(decision).toHaveProperty('qty', 1);
        expect((decision as DoActionDecision).sum).toBeCloseTo(99);
    });
});
