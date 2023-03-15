import {IsEnum, IsNumber, IsString} from "class-validator";
import {MarketKey} from "@markets/enums";

export class CreateSelectionItemDto {
    @IsNumber()
    maxQty: number

    @IsEnum(MarketKey)
    market: MarketKey

    @IsString()
    title: string
}
