import {Controller} from '@nestjs/common';
import {Crud, CrudController} from "@nestjsx/crud";
import {TradingStrategy} from "../entities/trading-strategy.entity";
import {StrategyCrudService} from "./strategy.crud-service";
import {Auth} from "../../auth/decorators/auth.decrator";
import {UserRole} from "../../user/enums";

@Crud({
    model: {
        type: TradingStrategy
    },
    routes: {}
})
@Auth(UserRole.ADMIN)
@Controller('api/strategy')
export class StrategyCrudController implements CrudController<TradingStrategy> {
    constructor(public service: StrategyCrudService) {
    }
}