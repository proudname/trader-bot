import {IsArray, IsEnum, IsString} from "class-validator";
import {TradingStrategyRule} from "../entities/trading-strategy-rule.entity";
import {StrategyStatus} from "../enums";

export class CreateStrategyDto {
    @IsString()
    name: string;

    @IsArray()
    items: { id: string }[];

    @IsArray()
    rules: Partial<TradingStrategyRule>[];

    @IsEnum(StrategyStatus)
    status: StrategyStatus;
}
