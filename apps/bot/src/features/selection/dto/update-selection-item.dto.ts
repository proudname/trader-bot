import {IsEnum, IsNumber, IsOptional, IsString} from "class-validator";
import {MarketKey} from "@markets/enums";

export class UpdateSelectionItemDto {
    @IsNumber()
    @IsOptional()
    maxQty: number

    @IsEnum(MarketKey)
    @IsOptional()
    market: MarketKey

    @IsString()
    @IsOptional()
    title: string
}
