import {Transform} from "class-transformer";

export class GetOneHistoryDto {
    @Transform(({value}) => typeof value === 'number' ? value : value.id)
    item: any

    @Transform(({value}) => typeof value === 'number' ? value : value.id)
    rule: any
}
