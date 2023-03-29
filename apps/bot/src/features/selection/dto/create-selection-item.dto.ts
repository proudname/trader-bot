import {IsNumber, IsObject, IsString} from "class-validator";

export class CreateSelectionItemDto {

    @IsObject()
    catalogItem: { id: number }

    @IsNumber()
    maxQty: number

    @IsString()
    title: string
}
