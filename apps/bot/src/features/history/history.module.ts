import {Module} from '@nestjs/common';
import {HistoryCrudController} from "./crud/history.crud-controller";
import {HistoryCrudService} from "./crud/history.crud-service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {History} from './entities/history.entity';
import {HistoryService} from "./history.service";

@Module({
    imports: [TypeOrmModule.forFeature([History])],
    controllers: [HistoryCrudController],
    providers: [HistoryCrudService, HistoryService],
    exports: [TypeOrmModule, HistoryService]
})
export class HistoryModule {
}
