import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PortfolioItem } from "../entity/portfolio-item.entity";

@Injectable()
export class PortfolioService {

  constructor(
    @InjectRepository(PortfolioItem) private portfolioRepository: Repository<PortfolioItem>
  ) {}

  async portfolio() {
    return this.portfolioRepository.find();
  }

}
