import {Controller} from '@nestjs/common';
import {Crud, CrudController} from "@nestjsx/crud";
import {Selection} from "../entities/selection.entity";
import {SelectionCrudService} from "./selection.crud-service";
import {Auth} from "../../auth/decorators/auth.decrator";
import {CreateSelectionDto} from "../dto/create-selection.dto";
import {UpdateSelectionDto} from "../dto/update-selection.dto";
import {GetOneSelectionDto} from "../dto/get-one-selection.dto";

@Crud({
    model: {
        type: Selection
    },
    routes: {},
    serialize: {
        get: GetOneSelectionDto
    },
    query: {
        join: {
            items: {
                eager: true,
            }
        }
    },
    dto: {
        create: CreateSelectionDto,
        update: UpdateSelectionDto
    }
})
@Auth()
@Controller('api/selection')
export class SelectionCrudController implements CrudController<Selection> {
    constructor(public service: SelectionCrudService) {
    }
}