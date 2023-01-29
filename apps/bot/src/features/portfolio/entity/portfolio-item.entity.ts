import { Entity, Column } from 'typeorm';
import BaseEntity from '../../../common/base.entity';
import {MarketKey} from "@markets/markets/enums";

@Entity()
export class PortfolioItem<T = any> extends BaseEntity {

  @Column()
  title: string;

  @Column({
    enum: MarketKey
  })
  market: MarketKey;

  @Column()
  qty: number;

  @Column({
    type: 'jsonb'
  })
  meta: T

}
