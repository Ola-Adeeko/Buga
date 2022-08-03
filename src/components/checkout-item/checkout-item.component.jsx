import React from "react";
import { connect } from "react-redux";

import { selectCurrencySwitch } from "../../redux/currency/currency.selector";
import { createStructuredSelector } from "reselect";
import Attribute from "../attributes/attributes.component";
import { addItem, removeItem } from "../../redux/cart/cart.actions";
import { ReactComponent as LeftArrow } from "../../assets/left.svg";
import { ReactComponent as RightArrow } from "../../assets/right.svg";
import "./checkout-item.style.scss";

class CheckoutItem extends React.Component {
  constructor() {
    super();

    this.state = {
      index: 0,
    };
  }

  render() {
    const next = (index) => {
      if (this.state.index === this?.props?.cartItem?.gallery.length - 1) {
        this.setState({ index: 0 });
      } else {
        this.setState({ index: index + 1 });
      }
    };

    const prev = (index) => {
      if (this.state.index === 0) {
        this.setState({ index: this?.props?.cartItem?.gallery.length - 1 });
      } else {
        this.setState({ index: index - 1 });
      }
    };

    const { currencySwitch, cartItem, addItem, removeItem } = this.props;
    const { name, brand, gallery, prices, quantity, attributes } = cartItem;
    const price = prices.find(
      (price) => price?.currency?.label === currencySwitch.label
    );
    var priceFloat = parseFloat(price?.amount).toFixed(2);
    var index = this.state.index;

    return (
      <div className="checkout-item">
        <div className="item-details">
          <span className="brand">{brand}</span>
          <span className="name">{name}</span>
          <span className="price">
            {price?.currency?.symbol}
            {priceFloat}
          </span>
          {attributes.map((attribute) => (
            <Attribute
              key={attribute.id}
              attribute={attribute}
              selected={cartItem.selected}
              isCart={true}
            />
          ))}
        </div>
        <div className="item-display">
          <span className="quantity">
            <div className="arrow1" onClick={() => addItem(cartItem)}>
              <span className="plus">&#43;</span>
            </div>
            <span className="value">{quantity}</span>
            <div className="arrow2" onClick={() => removeItem(cartItem)}>
              <span className="minus">&#8722;</span>
            </div>
          </span>
          <div className="image-container">
            <img src={gallery[this.state.index]} alt="item" />
            <LeftArrow className="prev" onClick={() => prev(index)} />
            <RightArrow className="next" onClick={() => next(index)} />
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addItem: (item) => dispatch(addItem(item)),
  removeItem: (item) => dispatch(removeItem(item)),
});

const mapStateToProps = createStructuredSelector({
  currencySwitch: selectCurrencySwitch,
});

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutItem);
