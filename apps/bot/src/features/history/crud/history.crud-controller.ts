import {Controller} from '@nestjs/common';
import {Crud, CrudController} from "@nestjsx/crud";
import {Auth} from "../../auth/decorators/auth.decrator";
import {UserRole} from "../../user/enums";
import {HistoryCrudService} from "./history.crud-service";
import {History} from '../entities/history.entity'

@Crud({
    model: {
        type: History
    },
    routes: {}
})
@Auth(UserRole.ADMIN)
@Controller('api/history')
export class HistoryCrudController implements CrudController<History> {
    constructor(public service: HistoryCrudService) {
    }
}