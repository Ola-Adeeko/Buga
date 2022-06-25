import React from "react";
import { connect } from "react-redux";

import { selectCurrencySwitch } from "../../redux/currency/currency.selector";
import { createStructuredSelector } from 'reselect'
import Attribute from "../attributes/attributes.component";
import { addItem, removeItem } from "../../redux/cart/cart.actions";
import './checkout-item.style.scss';

class CheckoutItem extends React.Component {
    
    render() {
        const { currencySwitch, cartItem, addItem, removeItem } = this.props

        
        const  { name, brand, gallery, prices, quantity, attributes } = cartItem;

        const price = prices.find((price => price?.currency?.label === currencySwitch.label));
        return (
            <div className="checkout-item">
                <div className="item-details">
                    <span className="brand">{brand}</span>
                    <span className="name">{name}</span>
                    <span className="price">{price?.currency?.symbol}{price?.amount}</span>
                        {
                            attributes.map(attribute => (
                                <Attribute key={attribute.id} attribute={attribute} />
                            ))
                        }
                </div>
                <div className="item-display">
                    <span className="quantity">
                        <div className="arrow1" onClick={() => addItem(cartItem)}><span className="plus">&#43;</span></div>
                        <span className="value">{quantity}</span>
                        <div className="arrow2" onClick={() => removeItem(cartItem)}><span className="minus">&#8722;</span></div>
                    </span>
                    <div className="image-container">
                        <img src={gallery[0]} alt="item" />
                    </div>
                </div>
            </div>
        );
    }
}

                
               

const mapDispatchToProps = dispatch => ({
    addItem: item => dispatch(addItem(item)),
    removeItem: item => dispatch(removeItem(item))
});

const mapStateToProps = createStructuredSelector({
    currencySwitch : selectCurrencySwitch
});

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutItem);