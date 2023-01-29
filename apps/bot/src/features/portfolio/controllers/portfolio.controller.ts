import { Controller, Get } from '@nestjs/common';
import { PortfolioService } from '../services/portfolio.service';

@Controller('history')
export class PortfolioController {
  constructor(private tradeService: PortfolioService) {}

  @Get('portfolio')
  portfolio() {
    return this.tradeService.portfolio()
  }

}
