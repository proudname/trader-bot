import {Controller} from '@nestjs/common';
import {Crud, CrudController} from "@nestjsx/crud";
import {Selection} from "../entities/selection.entity";
import {SelectionCrudService} from "./selection.crud-service";
import {Auth} from "../../auth/decorators/auth.decrator";
import {UserRole} from "../../user/enums";

@Crud({
    model: {
        type: Selection
    },
    routes: {}
})
@Auth(UserRole.ADMIN)
@Controller('api/selection')
export class SelectionCrudController implements CrudController<Selection> {
    constructor(public service: SelectionCrudService) {
    }
}