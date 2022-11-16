import React from "react";
import { NavLink } from "react-router-dom";

import './category.style.css';
import { ProductsContext } from "../../context/products.context";

export default class Category extends React.Component {
    
    static contextType = ProductsContext;
    componentDidUpdate(){
        const {setCurrencySelected}= this.context;
        const currencyIndx =this.props.currencyIndx;
        setCurrencySelected(currencyIndx);
    }

    render(){
        const {categories} = this.context;
        return(
            <div className="header-category">
                {categories.map(categoryItem=>{
                    const name = categoryItem;
                    return(
                        <NavLink key={`category_${name}`} to={`/${name}`} className='category' >{name}</NavLink>
                )})}
            </div>
        )
    }
}