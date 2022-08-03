import React from "react";

import { gql } from "apollo-boost";
import { Query } from "react-apollo";

import Currency from "./currency.component";
import "./currency-dropdown.style.scss";

const GET_CURRENCY_QUERY = gql`
  {
    currencies {
      label
      symbol
    }
  }
`;

class CurrencyDropdown extends React.Component {
  render() {
    return (
      <div className="drop-down">
        <Query query={GET_CURRENCY_QUERY}>
          {({ loading, data }) => {
            if (loading) return <p>Loading....</p>;
            const currency = data?.currencies;

            return currency.map((item) => (
              <Currency key={item.label} item={item} />
            ));
          }}
        </Query>
      </div>
    );
  }
}

export default CurrencyDropdown;
