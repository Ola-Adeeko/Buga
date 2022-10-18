import React from "react";
import { connect } from "react-redux";

import { gql } from "apollo-boost";
import { Query } from "react-apollo";

import Product from "../../components/product/product.component";
import { toggleCurrencyHidden } from "../../redux/currency/currency.action";
import { selectCurrencyHidden } from "../../redux/currency/currency.selector";
import { createStructuredSelector } from "reselect";

import "./product-display.style.scss";

const GET_PRODUCT_CATEGORY = (id) => gql`
{
    product (id:"${id}") {
        id,
        name,
        inStock,
        category,
        brand,
        attributes {
          id,
          name,
          type,
          items {
            id,
            value,
            displayValue,
          }
        }
        gallery,
        prices {
            amount
            currency {
              label
              symbol
            }
          },
        description
    }
}
`;

class ProductDisplay extends React.Component {
  state = {
    id: this.props.match.params.id,
  };
  componentDidMount() {
    document.title = `Buga | Shop | ${this.state.id}`;
  }

  render() {
    const { hiddenSwitch, toggleCurrencyHidden } = this.props;
    // console.log(this.props)

    return (
      <div
        className="product-display"
        onClick={() => (hiddenSwitch ? "" : toggleCurrencyHidden())}
      >
        <Query query={GET_PRODUCT_CATEGORY(this.state.id)}>
          {({ loading, data }) => {
            if (loading) return <p>Loading....</p>;

            const product = data?.product;

            return <Product item={product} />;
          }}
        </Query>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  toggleCurrencyHidden: () => dispatch(toggleCurrencyHidden()),
});
const mapStateToProps = createStructuredSelector({
  hiddenSwitch: selectCurrencyHidden,
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductDisplay);
