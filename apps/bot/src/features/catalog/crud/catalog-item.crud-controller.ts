import {Controller} from '@nestjs/common';
import {Crud, CrudController} from "@nestjsx/crud";
import {Auth} from "../../auth/decorators/auth.decrator";
import {CatalogItemCrudService} from "./catalog-item.crud-service";
import {CatalogItem} from "../entities/catalog-item.entity";

@Crud({
    model: {
        type: CatalogItem
    },
    routes: {}
})
@Auth()
@Controller('api/catalog-item')
export class CatalogItemCrudController implements CrudController<CatalogItem> {
    constructor(public service: CatalogItemCrudService) {
    }
}