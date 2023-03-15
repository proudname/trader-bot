import {IsEnum, IsNumber, IsString} from "class-validator";
import {MarketKey} from "@markets/enums";

export class CreatePortfolioItemDto {
    @IsNumber()
    qty: number

    @IsEnum(MarketKey)
    market: MarketKey

    @IsString()
    title: string
}
