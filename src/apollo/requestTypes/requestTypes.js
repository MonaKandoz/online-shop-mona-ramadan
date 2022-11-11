import { gql } from '@apollo/client';

export const GET_CATEGORY = gql`
query ($title: CategoryInput){
    category(input: $title){
    name
    products{
        id
        name
        inStock
        gallery
        prices{
          currency{
            label
            symbol
          }
          amount
        }
      }
    }
}`;

export const GET_PRODUCT = gql`
query ($id: String!){
    product(id: $id){
            id
            name
            gallery
            inStock
            attributes{
                id
                name
                type
                items{
                    id
                    value
                    displayValue
                }
            }
            prices{
                amount
                currency{
                    symbol
                    label
                }
            }
            brand
        }
    }`;
