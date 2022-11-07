import { createContext, useState } from "react";
import SHOP_DATA from "../shop_data.json";

export const ProductsContext = createContext({
    products: SHOP_DATA
});

export const ProductsProvider = ({children})=>{
    const [products, setProducts] = useState(SHOP_DATA);
    const value = {products};
    
    return(
        <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>
    )
}