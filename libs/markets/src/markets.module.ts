import {Module} from '@nestjs/common';
import {MarketsService} from './markets.service';
import {TinkoffService} from "@markets/tinkoff/tinkoff.service";

@Module({
    providers: [MarketsService, TinkoffService],
    exports: [MarketsService],
})
export class MarketsModule {
}
