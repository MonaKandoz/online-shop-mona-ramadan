import React from 'react';

import './categoryContent.style.css';
import ProductCard from '../../components/product-card/productcard.component';

export default class CategoryContent extends React.Component{
    render(){
        return(
            <main>
                <span className="category-name"> {this.props.category}</span>
                <div className="category-products">
                    <ProductCard category={this.props.category}></ProductCard>
                </div>
            </main>
        )
    }
}