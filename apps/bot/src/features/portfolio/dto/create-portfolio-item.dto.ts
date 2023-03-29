import {IsEnum, IsNumber, IsObject, IsString} from "class-validator";
import {MarketKey} from "@markets/enums";

export class CreatePortfolioItemDto {

    @IsObject()
    catalogItem: { id: number }

    @IsNumber()
    qty: number

    @IsEnum(MarketKey)
    market: MarketKey

    @IsString()
    title: string
}
