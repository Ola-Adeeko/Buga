import CurrencyActionTypes from "./currency.types";

export const switchCurrency = item => ({
    type: CurrencyActionTypes.SWITCH_CURRENCY,
    payload: item
});

export const toggleCurrencyHidden = () => ({
    type: CurrencyActionTypes.TOGGLE_CURRENCY_HIDDEN
});