import {DoActionDecision} from "@markets/decision-maker";
import {ISelectionItem} from "@shared/selection/selection-item.interface";
import {CatalogItem} from "../../../apps/bot/src/features/catalog/entities/catalog-item.entity";

export type ObserveParams = {
    strategyId: number
};

export type StopObserveParams = {
    strategyId: number
};

export type ApplyDecisionParams = {
    decision: DoActionDecision,
    item: ISelectionItem
}

export interface IMarketService {
    observe(params: ObserveParams);

    stopObserve(params: StopObserveParams);

    applyDecision(params: ApplyDecisionParams);

    loadItems(): AsyncGenerator<CatalogItem>;
}