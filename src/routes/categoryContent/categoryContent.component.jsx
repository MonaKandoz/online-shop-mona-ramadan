import React from 'react';
import { addCategoryResolver } from '../../apollo/resolvers/resolvers'

import { ProductsContext } from '../../context/products.context';
import './categoryContent.style.css';

import ProductCard from '../../components/product-card/productcard.component';
import Spinner from '../../components/spinner/spinner.component';

export default class CategoryContent extends React.Component{
    static contextType = ProductsContext;
    addCategoryProduct = async(categoryTitle)=>{
        const { setProductsList} = this.context;
        const products = await addCategoryResolver(categoryTitle);
        
        setProductsList(products);
    }
    render(){
        const { loading, productsList } = this.context;
        const {category} = this.props;
        this.addCategoryProduct(category);
        return(
            <>
            {
                loading? <Spinner />
                :
                <main>
                    <span className="category-name"> {category}</span>
                    
                    <div className="category-products">
                        {productsList.map((product,index)=>(
                            <ProductCard product={product}></ProductCard>
                            ))
                        }
                        
                    </div>
                </main>
            }
            </>
        )
    }
}