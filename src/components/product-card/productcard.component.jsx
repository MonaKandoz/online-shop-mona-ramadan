import React from "react";

import './productcard.style.css';

import { ProductsContext } from "../../context/products.context";
import AddToCartBtn from "../add-to-cart-btn/add-to-cart-btn.component";

class ProductCard extends React.Component{
    static contextType = ProductsContext;
    render(){
        const {currencySelected} = this.context;
        let {product} = this.props;
        let {id ,gallery ,inStock , name, prices} = product;

        return(
            <div key={`product_${id}`} className="product">
                <div className="product-img" style={{backgroundImage:`url(${gallery[0]})`}}>
                    {!inStock&&<span className='outStock'>out of Stock</span>}
                    <AddToCartBtn isSvgBtn={true} productID={id}/>
                </div>
                <div className="content">
                    <div className="product-name">{name}</div>
                    <span className="product-price">{prices[currencySelected].currency.symbol}{prices[currencySelected].amount}</span>
                </div>
            </div>
        )
    }
}

export default ProductCard;