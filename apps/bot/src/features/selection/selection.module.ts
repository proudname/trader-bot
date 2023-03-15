import {Module} from '@nestjs/common';
import {SelectionCrudController} from "./crud/selection.crud-controller";
import {SelectionCrudService} from "./crud/selection.crud-service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Selection} from "./entities/selection.entity";
import {SelectionItem} from "./entities/selection-item.entity";
import {SelectionItemCrudController} from "./crud/selection-item.crud-controller";
import {SelectionItemCrudService} from "./crud/selection-item.crud-service";

@Module({
    imports: [TypeOrmModule.forFeature([Selection, SelectionItem])],
    controllers: [SelectionCrudController, SelectionItemCrudController],
    providers: [SelectionCrudService, SelectionItemCrudService],
})
export class SelectionModule {
}
