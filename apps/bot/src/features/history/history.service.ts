import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {History} from './entities/history.entity'
import {Repository} from "typeorm";

@Injectable()
export class HistoryService {
    constructor(
        @InjectRepository(History) private repository: Repository<History>
    ) {
    }

    addHistoryItem(itemData: Pick<History, 'qty' | 'item' | 'result' | 'rule' | 'price'>) {
        const item = new History();
        Object.assign(item, itemData);
        return this.repository.save(item);
    }


}
