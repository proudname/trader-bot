import {Transform} from "class-transformer";

export class GetOneSelectionDto {
    @Transform(({value}) => value.map(item => typeof item === 'number' ? item : item.id))
    items: any[]
}
