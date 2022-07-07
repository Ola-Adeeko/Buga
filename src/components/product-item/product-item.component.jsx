import React from "react";
import { connect } from "react-redux";


import './product-item.style.scss';
import { addItem } from "../../redux/cart/cart.actions";

import { selectCurrencySwitch } from "../../redux/currency/currency.selector";
import { displayItem } from "../../redux/cart/cart.actions"
import { createStructuredSelector } from 'reselect'
import Attribute from "../attributes/attributes.component";
import CustomButton from "../../components/custom-button/custom-button.component";


class Product extends React.Component {
    constructor () {
        super();

        this.state = {
            index : 0,
            attributes: '',
            addToBagMsg: "Select Choices To Add To Bag",
            selected:{}
        }

    }
    handleChange = (value) => {
        console.log(value)
        this.setState({attributes: value})
    }

    

    handleTab = (index) => {
        this.setState({index:index})
    }
    render() {
        console.log(this.props.item)
        
        var parse = require('html-react-parser')

        const item = this.props.item
        const {currencySwitch, addItem, display} = this.props
        const price = item.prices.find((price => price?.currency?.label === currencySwitch.label));
        var priceFloat = parseFloat(price?.amount).toFixed(2)
       
        return (
            <div className="product-display">
                <div className="display-item">
                    <div className="small-image-container">

                            {
                                item.gallery.map((image, index) => (
                                    <div className="small-image">
                                        <img className="small" src={image} alt='item' key={index}
                                        onClick={() => this.handleTab(index)}
                                        />
                                    </div>
                                ))
                            }
                    
                       
                    </div>
                </div>
                <div className="main">
                    <div className={`${item.inStock ? '' : 'out-stock'} large-image-container`}>
                        <img className="large" src={item.gallery[this.state.index]} onClick={() => display(item)} alt="item" />
                        <div className="stock">
                                <span>OUT OF STOCK</span>
                        </div>
                    </div>
               
                    <div className="display-content">
                        <span className="brand">{item.brand}</span>
                        <span className="name">{item.name}</span>
                        <div className="attribute">
                            {
                                item.attributes.map(attribute => (
                                    <Attribute key={attribute.id} attribute={attribute} onClick={display} onChange={this.handleChange} />
                                ))
                            }
                        </div>
                        
                        <span > 
                            <div className="price">PRICE:</div>
                            <div className="amount">{price?.currency?.symbol}{priceFloat}</div>
                        </span>
                        <div className="button">
                            {
                                (item.inStock )  ? (<CustomButton onClick={() => addItem(item)}>ADD TO CART</CustomButton>) : <CustomButton outStock>ADD TO CART</CustomButton>
                            }
                        </div>
                        
                        <div className="description">
                            {parse(item.description)}
                        </div>
                    </div>
                
                </div>
            </div>
        )
    }
}   
    
const mapDispatchToProps = dispatch => ({
    addItem: item => dispatch(addItem(item)),
    display: item => dispatch(displayItem(item))
});

const mapStateToProps = createStructuredSelector({
    currencySwitch : selectCurrencySwitch,
   
});

export default connect(mapStateToProps,mapDispatchToProps)(Product);
