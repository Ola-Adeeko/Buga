import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { createStructuredSelector } from "reselect";

import CustomButton from "../custom-button/custom-button.component";
import CartItem from "../cart-item/cart-item.component";
import { toggleCartHidden } from "../../redux/cart/cart.actions";
import { selectCartItems } from "../../redux/cart/cart.selectors";
import { selectCartItemsCount } from "../../redux/cart/cart.selectors";
import { selectCartTotal } from "../../redux/cart/cart.selectors";
import { selectCurrencySwitch } from "../../redux/currency/currency.selector";


import './cart-dropdown.style.scss';

class CartDropdown extends React.Component {
    render() {
        const {cartItems, itemCount, total, currency } = this.props

        const product = cartItems?.find((cartItem => cartItem.prices.find((price => price?.currency?.label === currency?.label))))
        const price  = product?.prices?.find((price => price?.currency?.label === currency?.label));

        return(
            <>
                <div className="cart-dropdown">
                    <span className="cart-title">My Bag.<span className="count">{itemCount} items</span> </span>
                    <div className="cart-items">
                        {cartItems.length ? (
                            cartItems.map(cartItem => (
                                <CartItem key={cartItem.id} product={cartItem} />
                            ))
                        ) : (
                            <span className="empty-message">Your cart is empty</span>
                        )}
                    </div>
                    <div className="total">
                        <span className="rob">Total</span>
                        <span>{price?.currency?.symbol}{total.toFixed(2)}</span>
                    </div>
                    <div className="checkout">
                        <Link to='/checkout'>
                            <CustomButton onClick={() => this.props.dispatch(toggleCartHidden())}>VIEW BAG</CustomButton>
                        </Link>
                        <CustomButton>CHECKOUT</CustomButton>
                    </div>
                </div>
                <div className='pop-up' onClick={() => this.props.dispatch(toggleCartHidden())}></div>
            </>
        );
    }
}


const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems,
    itemCount: selectCartItemsCount,
    total: selectCartTotal,
    currency : selectCurrencySwitch,
    
    

});


export default connect(mapStateToProps)(CartDropdown);