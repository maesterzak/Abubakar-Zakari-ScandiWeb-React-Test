import { gql } from "@apollo/client";

const getProduct = (id) => gql`
{
  product(id:"${id}"){
    id
    name
    brand
    description
    gallery
    attributes{
      id
      name
      items{
        id
        value
        displayValue
      }
      
    }
    inStock
    prices{
      amount
      currency{
        symbol
        label
      }
    }
  }
}`
export default getProduct;