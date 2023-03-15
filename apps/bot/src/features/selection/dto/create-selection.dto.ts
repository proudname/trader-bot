import {IsArray, IsString} from "class-validator";

export class CreateSelectionDto {
    @IsString()
    name: string;

    @IsArray()
    items: any[]
}
