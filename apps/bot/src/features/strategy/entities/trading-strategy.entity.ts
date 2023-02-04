import { Entity, Column, JoinColumn, ManyToOne, OneToMany, RelationId } from "typeorm";
import BaseEntity from '@shared/base.entity';
import {PortfolioItem} from "../../portfolio/entity/portfolio-item.entity";
import {DBRelation} from "../../../types";
import {TradingStrategyRule} from "./trading-strategy-rule.entity";

@Entity()
export class TradingStrategy extends BaseEntity {
  @Column({ unique: true })
  name: string;

  @Column({type: 'number'})
  maxAmount: number;

  @Column({type: 'decimal', precision: 10, scale: 2})
  targetPrice: number;

  @ManyToOne(() => PortfolioItem)
  portfolioItem?: DBRelation<PortfolioItem>;

  @OneToMany(() => TradingStrategyRule, keyPoint => keyPoint.strategy)
  @JoinColumn()
  rules: TradingStrategyRule[];

  @Column({ default: false })
  isActive: boolean;

  @Column({ default: () => 'CURRENT_TIMESTAMP', type: 'timestamp' })
  cratedAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  startedAt?: Date;

  static async findForObserve() {
    return this.createQueryBuilder('s')
        .leftJoinAndSelect('s.ticker', 't')
        .leftJoinAndSelect('s.keyPoints', 'keyPoints')
        .where('s.isActive = TRUE')
        .getMany();
  }
}
