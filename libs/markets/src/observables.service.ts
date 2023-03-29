import {Injectable} from '@nestjs/common';
import {Observable} from "rxjs";

export type ObservablePrice = Observable<{ averagePrice: number }>;

@Injectable()
export class ObservablesService {

    private observables: Map<string, ObservablePrice> = new Map<string, ObservablePrice>();

    get(code: string): ObservablePrice {
        return this.observables.get(code);
    }

    set(code: string, observable: ObservablePrice) {
        this.observables.set(code, observable);
    }
}
