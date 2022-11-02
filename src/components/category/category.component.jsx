import React from "react";
import { NavLink } from "react-router-dom";

import './category.style.css';
import { ProductsContext } from "../../context/products.context";

export default class Category extends React.Component {
    
    static contextType = ProductsContext;

    render(){
        const {products}= this.context;
        return(
            <div className="header-category">
                {products[0].categories.map(categoryItem=>{
                    const name = categoryItem.name;
                    return(
                        <NavLink key={`category_${name}`} to={`/${name}`} className='category' >{name}</NavLink>
                )})}
            </div>
        )
    }
}