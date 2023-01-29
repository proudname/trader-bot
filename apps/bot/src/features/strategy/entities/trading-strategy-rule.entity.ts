import {Column, Entity, JoinColumn, ManyToOne, OneToOne} from 'typeorm';
import {TradingStrategy} from './trading-strategy.entity';
import BaseEntity from '../../../common/base.entity';
import {DBRelation, EntityId} from "../../../types";
import {TradingRuleActionType, TradingRuleStatus} from "../../../common/enums";

type FindTickerRulesWithCertainTypeParams = {
  tickerId: EntityId,
  type: TradingRuleActionType
}

type MarkExecutedParams = {
  price: number,
  orderId?: string,
}

type MarkRulesExecutedParams = {
  rules: TradingStrategyRule[]
  price: number,
  orderId?: string,
}

@Entity()
export class TradingStrategyRule extends BaseEntity {

  @Column({type: 'number'})
  targetPrice: number;

  @Column()
  maxQty: number;

  @Column()
  actualQty: number;

  @Column({default: TradingRuleStatus.ACTIVE, enum: TradingRuleStatus})
  status: TradingRuleStatus;

  @Column({type: 'timestamp', nullable: true})
  executedAt?: Date;

  @ManyToOne(() => TradingStrategy, strategy => strategy.rules)
  strategy: DBRelation<TradingStrategy>;

  @Column({enum: TradingRuleActionType})
  type: TradingRuleActionType

  // static findTickerRulesWithCertainType(params: FindTickerRulesWithCertainTypeParams) {
  //   const { tickerId, type } = params;
  //   return this.find({
  //     where: {
  //       type,
  //       ticker: tickerId,
  //       status: TradingRuleStatus.ACTIVE
  //     }
  //   })
  // }

  // async markExecuted(params: MarkExecutedParams) {
  //   const { orderId, price } = params;
  //   const { strategy, type } = this;
  //   this.status = TradingRuleStatus.EXECUTED;
  //   this.executedAt = new Date();
  //   await this.save();
  //
  //   const historyRecord = plainToClass(History, {
  //     strategy,
  //     price,
  //     actionType: type,
  //     tradeType: TradeAction.SELL,
  //   });
  //   await historyRecord.save()
  // }

  // static async markRulesExecuted(params: MarkRulesExecutedParams) {
  //   const { orderId, price, rules } = params;
  //   for (const rule of rules) {
  //     await rule.markExecuted({ orderId, price })
  //   }
  // }
}
