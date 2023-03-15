import {IsArray, IsEnum, IsOptional, IsString} from "class-validator";
import {TradingStrategyRule} from "../entities/trading-strategy-rule.entity";
import {StrategyStatus} from "../enums";

export class UpdateStrategyDto {
    @IsString()
    @IsOptional()
    name: string;

    @IsArray()
    @IsOptional()
    items: { id: string }[];

    @IsArray()
    @IsOptional()
    rules: Partial<TradingStrategyRule>[];

    @IsEnum(StrategyStatus)
    @IsOptional()
    status: StrategyStatus;
}
