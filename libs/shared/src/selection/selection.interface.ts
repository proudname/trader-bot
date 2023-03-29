import {ISelectionItem} from "./selection-item.interface";
import {MarketKey} from "@markets/enums";

export interface ISelection {

    id: number;

    name: string;

    market: MarketKey;

    items: ISelectionItem[]

}