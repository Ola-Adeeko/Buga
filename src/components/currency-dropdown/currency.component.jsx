import React from "react";
import { connect } from "react-redux";
import { switchCurrency } from "../../redux/currency/currency.action";


import './currency-dropdown.style.scss';


class Currency extends React.Component {
    render() {
        const {item, switchCurrency} = this.props
        return (
            <div className='top' onClick={() => switchCurrency(item)} >
              <span className="left">{item.symbol}</span> <span className="right">{item.label}</span>
            </div>   
        );
    }
}

const mapDispatchToProps = dispatch => ({
    switchCurrency: item => dispatch(switchCurrency(item))
})

export default connect(null, mapDispatchToProps)(Currency);