import {Injectable} from "@nestjs/common";
import {InjectQueue} from "@nestjs/bull";
import {Queue} from "bull";

@Injectable()
export class CatalogService {
    constructor(
        @InjectQueue('catalog') private catalogQueue: Queue
    ) {
        console.log('add')
        catalogQueue.add({}, {
            repeat: {
                cron: '0 0 * * *'
            }
        }).catch((reason) => console.log(reason))
    }
}