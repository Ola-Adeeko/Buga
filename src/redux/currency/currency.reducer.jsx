import CurrencyActionTypes from "./currency.types"


const INITIAL_STATE = {
    hiddenSwitch: true,
    currency: {
        label: "USD",
        symbol: "$"
    }
}

const currencyReducer = (state = INITIAL_STATE, action ) => {
    switch (action.type) {
        case CurrencyActionTypes.SWITCH_CURRENCY:
            return {
                ...state,
                currency: action.payload
            };
        case CurrencyActionTypes.TOGGLE_CURRENCY_HIDDEN:
            return {
                ...state,
                hiddenSwitch: !state.hiddenSwitch
            }
        default: 
        return state
    }
};

export default currencyReducer;