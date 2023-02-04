import { Entity, Column } from 'typeorm';
import BaseEntity from '@shared/base.entity';
import {MarketKey} from "@markets/enums";

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
