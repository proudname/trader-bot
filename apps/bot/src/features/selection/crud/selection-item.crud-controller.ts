import {Controller} from '@nestjs/common';
import {Crud, CrudController} from "@nestjsx/crud";
import {Auth} from "../../auth/decorators/auth.decrator";
import {SelectionItem} from "../entities/selection-item.entity";
import {SelectionItemCrudService} from "./selection-item.crud-service";
import {CreateSelectionItemDto} from "../dto/create-selection-item.dto";
import {UpdateSelectionItemDto} from "../dto/update-selection-item.dto";

@Crud({
    model: {
        type: SelectionItem
    },
    routes: {},
    dto: {
        create: CreateSelectionItemDto,
        update: UpdateSelectionItemDto
    }
})
@Auth()
@Controller('api/selection-item')
export class SelectionItemCrudController implements CrudController<SelectionItem> {
    constructor(public service: SelectionItemCrudService) {
    }
}