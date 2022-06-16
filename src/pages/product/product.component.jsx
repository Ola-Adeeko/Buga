import React from "react";

import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';


import Product from "../../components/product-item/product-item.component";


import './product.style.scss';



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
      id : this.props.match.params.id 
    }
  
  render() {
    
    console.log(this.props)
    
    return (
    
      <div className="product-display">
          <Query query={GET_PRODUCT_CATEGORY(this.state.id)}>
            {({ loading, data }) => {
                if (loading) return <p>Loading....</p>;

                const product = data?.product;
                return <Product key={product.id} item={product} />
              }
              }
            
          </Query>
          
          
      
      </div>
    );
  }
}


export default ProductDisplay;


