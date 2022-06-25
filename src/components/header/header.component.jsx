import React from "react";
import { connect } from 'react-redux';

//import { Link } from 'react-router-dom';
import { Query } from 'react-apollo'
import { CATEGORIES_QUERY } from "../graphql/queries";
import CartIcon from "../cart-icon/cart-icon.component";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";
import HeaderOptions from "./header-options.component";
import CurrencyDropdown from '../currency-dropdown/currency-dropdown.component';
import CurrencyIcon from '../currency-icon/currency-icon.component';
import { selectCartHidden } from '../../redux/cart/cart.selectors';
import { selectCurrencyHidden } from '../../redux/currency/currency.selector';
import { createStructuredSelector} from 'reselect'

import { ReactComponent as Logo } from '../../assets/logo.svg';

import './header.style.scss';


class Header extends React.Component {
    render() {

        const { hidden, hiddenSwitch } = this.props

        return (
            <div className="parent" >
                <div className="header">
                    
                    <div className="options">
                        <Query query={CATEGORIES_QUERY}>
                            {({ loading, data }) => {
                                if (loading) return <p>Loading....</p>;
        
                                const categories = data?.categories;
                                return categories.map(category => (
                                    <HeaderOptions key={category.name} category={category} />
                                ) )
                            }}
                        
                        </Query>
                    </div>
                    <div className="logo-container"> <Logo className="logo" /></div>
                
                    <div className="cart">
                        <div><CurrencyIcon /></div>
                        <div><CartIcon /></div>
                        {
                        hiddenSwitch ? null : <CurrencyDropdown />
                        },
                    
                        {
                            hidden ? null : <CartDropdown/>
                            }
        
                    </div>
                </div>
            </div>
        )
    }
}


const mapStateToProps = createStructuredSelector({
    hidden: selectCartHidden,
    hiddenSwitch: selectCurrencyHidden
});

export default connect(mapStateToProps)(Header);