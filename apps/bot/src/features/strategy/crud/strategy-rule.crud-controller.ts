import {Controller} from '@nestjs/common';
import {Crud, CrudController} from "@nestjsx/crud";
import {Auth} from "../../auth/decorators/auth.decrator";
import {TradingStrategyRule} from "../entities/trading-strategy-rule.entity";
import {StrategyRuleCrudService} from "./strategy-rule.crud-service";

@Crud({
    model: {
        type: TradingStrategyRule
    },
    routes: {},
})
@Auth()
@Controller('api/strategy-rule')
export class StrategyRuleCrudController implements CrudController<TradingStrategyRule> {
    constructor(public service: StrategyRuleCrudService) {
    }
}