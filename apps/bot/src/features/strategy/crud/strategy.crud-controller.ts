import {Controller} from '@nestjs/common';
import {Crud, CrudController, CrudRequest, Override, ParsedBody, ParsedRequest} from "@nestjsx/crud";
import {TradingStrategy} from "../entities/trading-strategy.entity";
import {StrategyCrudService} from "./strategy.crud-service";
import {Auth} from "../../auth/decorators/auth.decrator";
import {GetOneStrategyDto} from "../dto/get-one-strategy.dto";
import {CreateStrategyDto} from "../dto/create-strategy.dto";
import {UpdateStrategyDto} from "../dto/update-strategy.dto";
import {StrategyService} from "../strategy.service";

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
    constructor(
        public service: StrategyCrudService,
        private strategyService: StrategyService
    ) {
    }

    get base(): CrudController<TradingStrategy> {
        return this;
    }

    @Override('updateOneBase')
    async updateOne(
        @ParsedRequest() req: CrudRequest,
        @ParsedBody() dto: UpdateStrategyDto,
    ) {
        await this.strategyService.handleStrategyUpdate(req.parsed.paramsFilter[0].value, dto);
        return this.base.updateOneBase(req, dto as any);
    }
}