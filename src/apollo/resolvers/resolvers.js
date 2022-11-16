import { default as ApolloClient } from 'apollo-boost';
import { GET_PRODUCT, GET_CATEGORY } from "../../apollo/requestTypes/requestTypes";

const apolloClient = new ApolloClient({
    uri: 'http://localhost:4000/',
});

export const addProductResolver= async(productID) =>{
    const data= await apolloClient.query({
        query: GET_PRODUCT,
        variables: {id: productID}
        }).then((res)=>{return res})
        
    const product = data.data.product;
    return product;
}

export const addCategoryResolver= async(categoryTitle,offset,limit) =>{
    const data= await apolloClient.query({
        query: GET_CATEGORY,
        variables: {title:{title: categoryTitle}}
        }).then((res)=>{return res})
        
    const products = data.data.category.products.slice(offset, limit + offset);
    return products;
}
