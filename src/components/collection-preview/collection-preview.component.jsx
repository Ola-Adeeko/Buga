import React from "react";

import { gql } from "apollo-boost";
import { Query } from "react-apollo";

import CollectionItem from "../collection-item/collection-item.component";

import "./collection-preview.style.scss";

const GET_CATEGORY_QUERY = (name) => gql`
{
    category(input:{title:"${name}"}) {
        name
        products {
            id
            name
            brand
            inStock
            prices {
                amount
                currency {
                  label
                  symbol
                }
              }
            gallery,
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
        }
    }
}
`;

class CollectionPreview extends React.Component {
  render() {
    const name = this.props.name;
    return (
      <div className="collection-preview">
        <h1 className="title">{name.toUpperCase()}</h1>
        <div className="preview">
          <Query query={GET_CATEGORY_QUERY(name)}>
            {({ loading, data }) => {
              if (loading) return <p>Loading....</p>;

              return (data?.category ?? []).products.map((product) => (
                <CollectionItem key={product.id} item={product} />
              ));
            }}
          </Query>
        </div>
      </div>
    );
  }
}

export default CollectionPreview;
