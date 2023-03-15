import {Transform} from "class-transformer";

export class GetOneStrategyDto {
    @Transform(({value}) => value.map(item => typeof item === 'number' ? item : item.id))
    items: any[]
}
