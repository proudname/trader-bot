import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    OneToMany,
    UpdateDateColumn
} from "typeorm";
import BaseEntity from '@shared/base.entity';
import {TradingStrategyRule} from "./trading-strategy-rule.entity";
import {Selection} from '../../selection/entities/selection.entity';
import {StrategyStatus} from "@shared/enums";
import {MarketKey} from "@markets/enums";
import {DBRelation} from "@shared/types";
import {ITradingStrategy} from "@shared/strategy/trading-strategy.interface";
import {ITradingStrategyRule} from "@shared/strategy/trading-strategy-rule.interface";

@Entity()
export class TradingStrategy extends BaseEntity implements ITradingStrategy {
    @Column({unique: true})
    name: string;

    @Column({
        type: 'varchar',
        enum: MarketKey
    })
    market: MarketKey;

    @ManyToMany(() => Selection)
    @JoinTable()
    items: DBRelation<Selection>[];

    @OneToMany(() => TradingStrategyRule, rule => rule.strategy, {
        cascade: true,
    })
    @JoinColumn()
    rules: DBRelation<ITradingStrategyRule>[];

    @Column({type: 'varchar', enum: StrategyStatus, default: StrategyStatus.DISABLED})
    status: StrategyStatus;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
