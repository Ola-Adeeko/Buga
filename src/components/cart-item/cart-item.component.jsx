import React from 'react';
import { connect } from 'react-redux';

import Attribute from '../attributes/attributes.component';
import {  addItem, removeItem } from "../../redux/cart/cart.actions";

import './cart-item.style.scss';
import { selectCurrencySwitch } from "../../redux/currency/currency.selector";
import { createStructuredSelector } from 'reselect'

class CartItem extends React.Component {
    render() {
        const { addItem, removeItem, currencySwitch, product } = this.props
        const price = product?.prices?.find((price => price?.currency?.label === currencySwitch?.label));
        return (
            <div className="cart-item">
                
                <div className="item-details">
                    <span className="brand">{product.brand}</span>
                    <span className="name">{product.name}</span>
                    <span className="price">{price?.currency?.symbol}{price?.amount}</span>
                    {
                        product.attributes.map(attribute => (
                            <Attribute key={attribute.id} attribute={attribute} />
                        ))
                    }
                </div>
                <span className="quantity">
                    <div className="arrow1" onClick={() => addItem(product)}><span className="plus">&#43;</span></div>
                    <span className="value">{product.quantity}</span>
                    <div className="arrow2" onClick={() => removeItem(product)}><span className="minus">&#8722;</span></div>
                </span>
                <div className="image">
                    <img src={product.gallery[0]} alt='item' />
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

export default connect(mapStateToProps,mapDispatchToProps)(CartItem);