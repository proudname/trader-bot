import {IsEnum, IsNumber, IsObject, IsOptional, IsString} from "class-validator";
import {MarketKey} from "@markets/enums";

export class UpdatePortfolioItemDto {

    @IsOptional()
    @IsObject()
    catalogItem: { id: number }

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
