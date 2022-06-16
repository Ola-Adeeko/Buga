import React  from 'react';
import { connect } from 'react-redux';

import { toggleCartHidden } from '../../redux/cart/cart.actions';
import { selectCartItemsCount } from '../../redux/cart/cart.selectors';


import {ReactComponent as ShopIcon} from '../../assets/empty.svg';


import './cart-icon.style.scss';
 

class CartIcon extends React.Component{
    render() {
        const { toggleCartHidden, itemCount } = this.props
        return (
            <div className="cart-icon" onClick={toggleCartHidden} >
                <ShopIcon className='shopping-icon' />
                <span className={` ${itemCount ? 'item-count' :'item-dp'}`}>{ itemCount }</span>
            </div>
        )
    }
}


const mapDispatchToProps = dispatch => ({
    toggleCartHidden: () => dispatch(toggleCartHidden())
});

const mapStateToProps = state=> ({
    itemCount: selectCartItemsCount(state)
});

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);