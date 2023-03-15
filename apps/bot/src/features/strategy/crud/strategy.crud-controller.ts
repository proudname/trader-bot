import {Controller} from '@nestjs/common';
import {Crud, CrudController} from "@nestjsx/crud";
import {TradingStrategy} from "../entities/trading-strategy.entity";
import {StrategyCrudService} from "./strategy.crud-service";
import {Auth} from "../../auth/decorators/auth.decrator";
import {GetOneStrategyDto} from "../dto/get-one-strategy.dto";
import {CreateStrategyDto} from "../dto/create-strategy.dto";
import {UpdateStrategyDto} from "../dto/update-strategy.dto";

@Crud({
    model: {
        type: TradingStrategy
    },
    routes: {},
    serialize: {
        get: GetOneStrategyDto
    },
    query: {
        join: {
            items: {
                eager: true,
            },
            rules: {
                eager: true,
            }
        }
    },
    dto: {
        create: CreateStrategyDto,
        update: UpdateStrategyDto
    }
})
@Auth()
@Controller('api/strategy')
export class StrategyCrudController implements CrudController<TradingStrategy> {
    constructor(public service: StrategyCrudService) {
    }
}