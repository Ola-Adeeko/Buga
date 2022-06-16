import { createSelector } from "reselect";



const selectCart = state => state.cart;
const selectCurrency =  state => state.currency.currency;

export const selectCartItems = createSelector(
    [selectCart],
    cart => cart.cartItems
);

export const selectProduct = createSelector(
    [selectCart],
    cart => cart.product
);

export const selectCartHidden = createSelector(
    [selectCart],
    cart => cart.hidden
);

export const selectCartItemsCount = createSelector(
    [selectCartItems],
    cartItems => 
        cartItems.reduce((accumulatedQuantity, cartItem) =>
        accumulatedQuantity + cartItem.quantity , 0)
);

export const selectCartTotal = createSelector(
    [selectCartItems, selectCurrency],
    (cartItems, currency) => 
        cartItems.reduce((accumulatedQuantity, cartItem) =>
        accumulatedQuantity + cartItem.quantity * cartItem.prices.find(price => price.currency.label === currency.label).amount , 0)
);
