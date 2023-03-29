import {Global, Module} from '@nestjs/common';
import {SharedService} from './shared.service';
import PolygonApi from "@shared/api/polygon.api";

@Global()
@Module({
    providers: [SharedService, PolygonApi],
    exports: [SharedService],
})
export class SharedModule {
}
