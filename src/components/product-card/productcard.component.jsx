import React from "react";

import './productcard.style.css';
import {ReactComponent as ChartSVG} from '../../images/chart.svg';

import { ProductsContext } from "../../context/products.context";

class ProductCard extends React.Component{
    static contextType = ProductsContext;
    render(){
        var i = 0;
        const category = this.props.category;
        if(category === 'clothes'){
            i=1;
        }else if(category === 'tech'){
            i=2;
        }
        let products = this.context.products[0].categories[i].products;
        
        return(
            products.map((product,index)=>(
                <div key={`product_${category}_${index}`} className="product">
                    <div className="product-img" style={{backgroundImage:`url(${product.gallery[0]})`}}>
                        {!product.inStock&&<span className='outStock'>out of Stock</span>}
                        <span className="add-to-chart"><ChartSVG /></span>
                    </div>
                    <div className="content">
                        <div className="product-name">{product.name}</div>
                        <span className="product-price">{product.prices[0].currency.symbol}{product.prices[0].amount}</span>
                    </div>
                    
                </div>
            ))
            
        )
    }
}

export default ProductCard;