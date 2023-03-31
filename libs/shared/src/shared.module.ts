import {Global, Module} from '@nestjs/common';
import {SharedService} from './shared.service';
import PolygonApi from "@shared/api/polygon.api";
import {HttpModule} from "@nestjs/axios";

@Global()
@Module({
    imports: [HttpModule],
    providers: [SharedService, PolygonApi],
    exports: [SharedService],
})
export class SharedModule {
}
