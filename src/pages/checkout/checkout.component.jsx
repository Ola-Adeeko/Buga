import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { toggleCurrencyHidden } from "../../redux/currency/currency.action";
import { selectCurrencyHidden } from "../../redux/currency/currency.selector";
import { selectCurrencySwitch } from "../../redux/currency/currency.selector";
import {
  selectCartItems,
  selectCartTotal,
  selectCartItemsCount,
} from "../../redux/cart/cart.selectors";
import CheckoutItem from "../../components/checkout-item/checkout-item.component";
import CustomButton from "../../components/custom-button/custom-button.component";

import "./checkout.style.scss";

class CheckoutPage extends React.Component {
  render() {
    const {
      currency,
      cartItems,
      total,
      itemCount,
      hiddenSwitch,
      toggleCurrencyHidden,
    } = this.props;

    var tax = parseFloat(total * 0.21).toFixed(2);
    var totalFloat = parseFloat(total).toFixed(2);
    const product = cartItems?.find((cartItem) =>
      cartItem.prices.find(
        (price) => price?.currency?.label === currency?.label
      )
    );
    const price = product?.prices?.find(
      (price) => price?.currency?.label === currency?.label
    );
    return (
      <div
        className="checkout-page"
        onClick={() => (hiddenSwitch ? "" : toggleCurrencyHidden())}
      >
        <div className="checkout-header">
          <div className="header-block">
            <span>CART</span>
          </div>
        </div>
        {cartItems.map((cartItem) => (
          <CheckoutItem key={cartItem.id} cartItem={cartItem} />
        ))}

        <div className="total">
          <div className="total-content">
            <div>Tax 21%: </div>
            <div>Quantity: </div>
            <div>Total: </div>
          </div>
          <div className="total-amount">
            <div>
              {" "}
              {price?.currency?.symbol}
              {tax}
            </div>
            <div> {itemCount}</div>
            <div>
              {price?.currency?.symbol}
              {totalFloat}
            </div>
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
  itemCount: selectCartItemsCount,
  hiddenSwitch: selectCurrencyHidden,
});
const mapDispatchToProps = (dispatch) => ({
  toggleCurrencyHidden: () => dispatch(toggleCurrencyHidden()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutPage);
