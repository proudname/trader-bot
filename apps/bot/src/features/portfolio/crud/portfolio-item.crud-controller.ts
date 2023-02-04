import {Controller} from '@nestjs/common';
import {Crud, CrudController} from "@nestjsx/crud";
import {Auth} from "../../auth/decorators/auth.decrator";
import {UserRole} from "../../user/enums";
import {PortfolioItemCrudService} from "./portfolio-item.crud-service";
import {PortfolioItem} from "../entities/portfolio-item.entity";

@Crud({
    model: {
        type: PortfolioItem
    },
    routes: {}
})
@Auth(UserRole.ADMIN)
@Controller('api/portfolio')
export class PortfolioItemCrudController implements CrudController<PortfolioItem> {
    constructor(public service: PortfolioItemCrudService) {
    }
}