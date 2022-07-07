import React from "react";
import { connect } from "react-redux";

import CollectionPreview from "../../components/collection-preview/collection-preview.component";
import {toggleCurrencyHidden} from '../../redux/currency/currency.action'
import { selectCurrencyHidden } from '../../redux/currency/currency.selector';
import { createStructuredSelector} from 'reselect'


class ShopPage extends React.Component {
    render () {
        const { hiddenSwitch, toggleCurrencyHidden } = this.props
        
        return (
            <div className="shop-page" onClick={() => hiddenSwitch ? '' : toggleCurrencyHidden() }>
                <CollectionPreview name={this.props.match.params.category} />
            </div>
            );
    }        
};

const mapDispatchToProps = dispatch => ({
    toggleCurrencyHidden: () => dispatch(toggleCurrencyHidden())
})
const mapStateToProps = createStructuredSelector({
    hiddenSwitch: selectCurrencyHidden
});
export default connect(mapStateToProps,mapDispatchToProps)(ShopPage);