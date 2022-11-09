import React from "react";
import { connect } from 'react-redux';

import './productcard.style.css';

import AddToCartBtn from "../add-to-cart-btn/add-to-cart-btn.component";

class ProductCard extends React.Component{
    render(){
        var i = 0;
        const category = this.props.category;
        if(category === 'clothes'){
            i=1;
        }else if(category === 'tech'){
            i=2;
        }
        const {categories} = this.props;
        let products = categories[i].products;
        return(
            products.map((product,index)=>(
                <div key={`product_${category}_${index}`} className="product">
                    <div className="product-img" style={{backgroundImage:`url(${product.gallery[0]})`}}>
                        {!product.inStock&&<span className='outStock'>out of Stock</span>}
                        <AddToCartBtn isSvgBtn={true} product={product}/>
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

const mapStateToProps = function(state) {
    return {
        categories: state.categories.categories
    }
};


export default connect(mapStateToProps)(ProductCard);