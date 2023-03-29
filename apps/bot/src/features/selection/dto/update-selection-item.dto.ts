import {IsEnum, IsNumber, IsObject, IsOptional, IsString} from "class-validator";
import {MarketKey} from "@markets/enums";

export class UpdateSelectionItemDto {

    @IsOptional()
    @IsObject()
    catalogItem: { id: number }

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
