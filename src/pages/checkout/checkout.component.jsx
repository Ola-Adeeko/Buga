import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectCurrencySwitch } from '../../redux/currency/currency.selector'
import { selectCartItems, selectCartTotal, selectCartItemsCount } from "../../redux/cart/cart.selectors";
import CheckoutItem from "../../components/checkout-item/checkout-item.component";
import CustomButton from "../../components/custom-button/custom-button.component";

import './checkout.style.scss'


class CheckoutPage extends React.Component {
    render() {
        const {currency, cartItems, total, itemCount } = this.props

        var tax = (total * 0.21).toFixed(2)
        const product = cartItems?.find((cartItem => cartItem.prices.find((price => price?.currency?.label === currency?.label))))
        const price  = product?.prices?.find((price => price?.currency?.label === currency?.label));
        return (
            <div className="checkout-page">
                <div className="checkout-header">
                    <div className="header-block">
                        <span>CART</span>
                    </div>
                </div>
                {cartItems.map(cartItem => (
                    <CheckoutItem key={cartItem.id} cartItem={cartItem} />
                ))}

                <div className="total">
                    <div className="total-content">
                        <div>Tax 21%: </div>
                        <div>Quantity: </div>
                        <div>Total: </div>
                    </div>
                    <div className="total-amount">
                        <div> {price?.currency?.symbol}{tax}</div>
                        <div> {itemCount}</div>
                        <div>{price?.currency?.symbol}{total.toFixed(2)}</div>
                    </div>
                    
                </div>
                <CustomButton>ORDER</CustomButton>
            </div>
        );
    }
}


const mapStateToProps = createStructuredSelector({
    currency: selectCurrencySwitch,
    cartItems: selectCartItems,
    total: selectCartTotal,
    itemCount: selectCartItemsCount
});

export default connect(mapStateToProps)(CheckoutPage);