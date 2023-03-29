import {TradeAction} from "../enums";


export const traderActionMapper = (key: TradeAction) => {
    switch (key) {
        case TradeAction.BUY:
            return 'Buy';
        case TradeAction.SELL:
            return 'Sell';
    }
}