import {Module} from '@nestjs/common';
import {HistoryCrudController} from "./crud/history.crud-controller";
import {HistoryCrudService} from "./crud/history.crud-service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {History} from './entities/history.entity';

@Module({
    imports: [TypeOrmModule.forFeature([History])],
    controllers: [HistoryCrudController],
    providers: [HistoryCrudService]
})
export class HistoryModule {
}
