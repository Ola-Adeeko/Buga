import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { addItem } from "../../redux/cart/cart.actions";
import { createStructuredSelector } from "reselect";
import { selectCurrencySwitch } from "../../redux/currency/currency.selector";
import './collection-item.style.scss';
import { ReactComponent as CartLogo } from '../../assets/common.svg';


class CollectionItem extends React.Component {
    
    render() {
       console.log(this.props)
       const {currencySwitch, item, addItem} = this.props
       const { id, brand, name, gallery, inStock } = item
        const price = item.prices.find((price => price?.currency?.label === currencySwitch?.label));

        const floatPrice = parseFloat(price?.amount).toFixed(2)
       
            return (
                
                <div className={`${inStock ? '' : 'out-stock'} collection-item `} >
                        <Link to={`/product/${id}`}>
                            <div className="image-container">
                                <img src={gallery[0]} alt={name} className='image' />
                            </div>
        
                            <div className="collection-footer">
                                <span className="brand">{brand} </span>
                                <span className="name">{name}</span>
                                <span className="price">{price?.currency?.symbol}{floatPrice}</span>
                            </div>
                        </Link> 
                        <div className="stock">
                            <span>OUT OF STOCK</span>
                        </div>
                        <div className="cart-icon" >< CartLogo className="icon" onClick={() => addItem(item)}/></div>
                </div>
                 
            );
    }
}

const mapDispatchToProps = dispatch => ({
    addItem: item => dispatch(addItem(item)),
})


const mapStateToProps = createStructuredSelector({
    currencySwitch : selectCurrencySwitch
});

export default connect(mapStateToProps, mapDispatchToProps)(CollectionItem);