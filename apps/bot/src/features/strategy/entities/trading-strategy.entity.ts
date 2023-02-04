import {Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, OneToMany, UpdateDateColumn} from "typeorm";
import BaseEntity from '@shared/base.entity';
import {TradingStrategyRule} from "./trading-strategy-rule.entity";
import {StrategyStatus} from "../enums";
import {DBRelation} from "../../../types";
import {Selection} from '../../selection/entities/selection.entity';

@Entity()
export class TradingStrategy extends BaseEntity {
    @Column({unique: true})
    name: string;

    @ManyToMany(() => Selection)
    @JoinColumn()
    items: DBRelation<Selection[]>;

    @OneToMany(() => TradingStrategyRule, rule => rule.strategy)
    @JoinColumn()
    rules: DBRelation<TradingStrategyRule[]>;

    @Column({type: 'varchar', enum: StrategyStatus, default: StrategyStatus.ENABLED})
    status: StrategyStatus;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
