import {IsEnum, IsNumber, IsOptional, IsString} from "class-validator";
import {MarketKey} from "@markets/enums";

export class UpdatePortfolioItemDto {
    @IsNumber()
    @IsOptional()
    qty: number

    @IsEnum(MarketKey)
    @IsOptional()
    market: MarketKey

    @IsString()
    @IsOptional()
    title: string
}
