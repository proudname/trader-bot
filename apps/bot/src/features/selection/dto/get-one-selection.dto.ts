import {Transform} from "class-transformer";

export class GetOneSelectionDto {
    @Transform((
            {value}
        ) => value.map(item => {
            return {...item, catalogItem: typeof item.catalogItem === 'number' ? item.catalogItem : item.catalogItem.id}
        })
    )
    items: any[]
}
