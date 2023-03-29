import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {PortfolioItem} from "./entities/portfolio-item.entity";
import {Repository} from "typeorm";

@Injectable()
export class PortfolioItemService {
    constructor(
        @InjectRepository(PortfolioItem) private repository: Repository<PortfolioItem>
    ) {
    }

}
