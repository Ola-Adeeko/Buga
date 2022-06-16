import { gql }  from 'apollo-boost';

export const collectionQuery = gql`
{
    categories {
        name,
        products {
            id,
            name,
            inStock,
            category,
            brand,
            gallery,
            prices {
                amount
            }
        }
    } 
}
`;

export const CATEGORIES_QUERY = gql`
{
    categories {
        name
    } 
}
`;

export const productQuery = gql`
{
    product {
        id,
        name,
        inStock,
        category,
        brand,
        gallery,
        prices {
          amount
        }
      
    }
  }
`;

export const categoryAllQuery = gql`
{
    category(input:{title:"all"}){
      name,
      products {
          name,
          brand
        }
    }
  }
`;

export const categoryClothesQuery = gql`
{
    category(input:{title:"clothes"}){
      name,
      products {
          name,
          brand
        }
    }
  }
`;

export const categoryTechQuery = gql`
{
    category(input:{title:"tech"}){
      name,
      products {
          name,
          brand
        }
    }
  }
`;