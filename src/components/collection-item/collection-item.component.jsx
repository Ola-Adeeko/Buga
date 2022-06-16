import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { createStructuredSelector } from "reselect";
import { selectCurrencySwitch } from "../../redux/currency/currency.selector";
import './collection-item.style.scss';
import { ReactComponent as CartLogo } from '../../assets/common.svg';


class CollectionItem extends React.Component {
    
    render() {
       console.log(this.props)
       const {currencySwitch, item} = this.props
       const { id, brand, name, gallery, inStock } = item
        const price = item.prices.find((price => price?.currency?.label === currencySwitch?.label));
       
            return (
                <Link to={`/product/${id}`}>
                    <div className={`${inStock ? '' : 'out-stock'} collection-item `} >
     
                        <div className="image-container">
                            <img src={gallery[0]} alt={name} className='image' />
                        </div>
    
                        <div className="collection-footer">
                            <span className="brand">{brand} </span>
                            <span className="name">{name}</span>
                            <span className="price">{price?.currency?.symbol}{price?.amount}</span>
                        </div>
                        <div className="stock">
                            <span>OUT OF STOCK</span>
                        </div>
                        <div className="cart-icon" >< CartLogo className="icon" /></div>
                    </div>
                </Link>
            
                
            );
  
    }
}

       

const mapStateToProps = createStructuredSelector({
    currencySwitch : selectCurrencySwitch
});

    export default connect(mapStateToProps)(CollectionItem);