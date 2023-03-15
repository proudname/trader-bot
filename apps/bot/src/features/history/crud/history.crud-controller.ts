import {Controller} from '@nestjs/common';
import {Crud, CrudController} from "@nestjsx/crud";
import {Auth} from "../../auth/decorators/auth.decrator";
import {UserRole} from "../../user/enums";
import {HistoryCrudService} from "./history.crud-service";
import {History} from '../entities/history.entity'
import {GetOneHistoryDto} from "../dto/get-one-history.dto";

@Crud({
    model: {
        type: History
    },
    serialize: {
        get: GetOneHistoryDto
    },
    query: {
        join: {
            rule: {
                eager: true,
            },
            item: {
                eager: true,
            }
        }
    },
    routes: {}
})
@Auth(UserRole.ADMIN)
@Controller('api/history')
export class HistoryCrudController implements CrudController<History> {
    constructor(public service: HistoryCrudService) {
    }
}