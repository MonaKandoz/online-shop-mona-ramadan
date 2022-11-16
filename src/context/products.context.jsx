import { createContext, useState, useEffect } from "react";
import { gql, useQuery } from "@apollo/client";

export const ProductsContext = createContext({
    productsList: [],
    categories: [],
    currencySelected: 0
});

const CATEGORIES = gql`
    query{
        categories{
          name
        }
    }
`;
export const ProductsProvider = ({children})=>{
    const {loading, error, data} = useQuery(CATEGORIES);
    const [categories, setCategories] = useState([]);
    const [productsList, setProductsList] = useState([]);
    const [currencySelected, setCurrencySelected] = useState(0);


    useEffect(()=>{
        if(data){
            const categoriesArray = data.categories;
            const categoriesList = [];

            for(var i=0; i<categoriesArray.length; i++){
                const {name} = categoriesArray[i];
                categoriesList.push(name);
            }
            setCategories(categoriesList);
        }
    },[data]);
    
    const value = {setProductsList, productsList, categories, loading, currencySelected, setCurrencySelected, error};
    
    return(
        <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>
    )
}