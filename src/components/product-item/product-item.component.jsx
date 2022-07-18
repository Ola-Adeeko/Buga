import React from "react";
import { connect } from "react-redux";


import './product-item.style.scss';
import { addItem } from "../../redux/cart/cart.actions";

import { selectCurrencySwitch } from "../../redux/currency/currency.selector";
import { displayItem } from "../../redux/cart/cart.actions"
import { createStructuredSelector } from 'reselect'
import Attribute from "../attributes/attributes.component";
import CustomButton from "../../components/custom-button/custom-button.component";
import Selected from "../selected/selected.component";



class Product extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            index : 0,
            attributes: '',
            dot: this.props.item,
            product: {}

        }
    }
    
    productObject = () => {
        const product = {
            id : this.props.item.id,
            name: this.props.item.name,
            brand: this.props.item.brand,
            category: this.props.item.category,
            attributes: this.props.item.attributes,
            gallery : this.props.item.gallery,
            inStock : this.props.item.inStock,
            description: this.props.item.description,
            prices: this.props.item.prices,
            selected: {}
        }
    
        this.props.item.attributes.forEach((attribute) => {
            product.selected[attribute.name] = ""
        });

        this.setState({
            product: product
        })
    }

    
    componentWillMount() {
        this.productObject()
    }
    
    selected =(selected) => {
        selected = {}
    }
    handleChange = (attributeName, value) => {
        this.setState({
            product: {
                ...this.state.product,
                selected: {
                    ...this.state.product.selected,
                    [attributeName]: value
                }
            }
        })
       
    }

    handleTab = (index) => {
        this.setState({index:index})
    }
    render() {
        console.log(this.state)
        
        var parse = require('html-react-parser')

        const { product } = this.state
        const {currencySwitch, addItem, display} = this.props
        const price = product.prices.find((price => price?.currency?.label === currencySwitch.label));
        var priceFloat = parseFloat(price?.amount).toFixed(2)
       
        return (
            <div className="product-display">
                <div className="display-item">
                    <div className="small-image-container">

                            {
                                product.gallery.map((image, index) => (
                                    <div className="small-image">
                                        <img className="small" src={image} alt='product' key={index}
                                        onClick={() => this.handleTab(index)}
                                        />
                                    </div>
                                ))
                            }
                    
                       
                    </div>
                </div>
                <div className="main">
                    <div className={`${product.inStock ? '' : 'out-stock'} large-image-container`}>
                        <img className="large" src={product.gallery[this.state.index]} onClick={() => display(product)} alt="product" />
                        <div className="stock">
                                <span>OUT OF STOCK</span>
                        </div>
                    </div>
               
                    <div className="display-content">
                        <span className="brand">{product.brand}</span>
                        <span className="name">{product.name}</span>
                        <div className="attribute">
                            {
                                this.state.dot.attributes.map(attribute => (
                                    <Selected key={attribute.id} attribute={attribute} selected={product.selected} onClick={display} onChange={this.handleChange} />

                                ))
                            }
                        </div>
                            
                        <span > 
                            <div className="price">PRICE:</div>
                            <div className="amount">{price?.currency?.symbol}{priceFloat}</div>
                        </span>
                        <div className="button">
                            {
                                (product.inStock )  ? (<CustomButton onClick={() => addItem(product)}>ADD TO CART</CustomButton>) : <CustomButton outStock>ADD TO CART</CustomButton>
                            }
                        </div>
                        
                        <div className="description">
                            {parse(product.description)}
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
