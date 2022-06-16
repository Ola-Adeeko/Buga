import React from "react";
import { connect } from "react-redux";

import './product-item.style.scss';
import { addItem } from "../../redux/cart/cart.actions";

import { selectCurrencySwitch } from "../../redux/currency/currency.selector";
import { createStructuredSelector } from 'reselect'
import Attribute from "../attributes/attributes.component";
import CustomButton from "../../components/custom-button/custom-button.component";


class Product extends React.Component {
    constructor () {
        super();

        this.state = {
            attribute: {
                text:'',
                swatch:''
            },
            index : 0
        }

    }

    handleTab = index => {
        this.setState({index:index})
    }
    render() {
        const item = this.props.item
        const {currencySwitch} = this.props
        const price = item.prices.find((price => price?.currency?.label === currencySwitch.label));
        return (
            <div className="product-display">
                <div className="display-item">
                    <div className="small-image-container">
                        <div className="small-image">
                            {
                                item.gallery.map((image, index) => (
                                    <img className="small" src={image} alt='item' key={index}
                                    onClick={() => this.handleTab(index)}
                                    />
                                ))
                            }
                    
                        </div>
                    </div>
                </div>
                <div className="main">
                    <div className={`${item.inStock ? '' : 'out-stock'} large-image-container`}>
                        <img className="large" src={item.gallery[this.state.index]} alt="item" />
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
                                    <Attribute key={attribute.id} attribute={attribute}  />
                                ))
                            }
                        </div>
                        
                        <span > 
                            <div className="price">PRICE:</div>
                            <div className="amount">{price?.currency?.symbol}{price?.amount}</div>
                        </span>
                        <div className="button">
                            {
                                item.inStock ? (<CustomButton onClick={() => this.props.addItem(item)}>ADD TO CART</CustomButton>) : <CustomButton outStock>ADD TO CART</CustomButton>
                            }
                        </div>
                        
                        
                        <div className="description" dangerouslySetInnerHTML={{__html: item.description}} />
                    </div>
                
                </div>
            </div>
        )
    }
}   
    
const mapDispatchToProps = dispatch => ({
    addItem: item => dispatch(addItem(item)),
});

const mapStateToProps = createStructuredSelector({
    currencySwitch : selectCurrencySwitch
});

export default connect(mapStateToProps,mapDispatchToProps)(Product);
