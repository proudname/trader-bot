import {IsArray, IsOptional, IsString} from "class-validator";

export class UpdateSelectionDto {
    @IsString()
    @IsOptional()
    name: string;

    @IsArray()
    @IsOptional()
    items: number[]
}
