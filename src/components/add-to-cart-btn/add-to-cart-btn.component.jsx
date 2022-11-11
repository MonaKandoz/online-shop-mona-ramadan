import React from "react";
import { addProductResolver } from "../../apollo/resolvers/resolvers"; 

import './add-to-cart-btn.style.css';

import { CartContext } from "../../context/cart.context";
import {ReactComponent as ChartSVG} from '../../images/chart.svg';
import Button from "../button/button.component";

class AddToCartBtn extends React.Component{
    static contextType = CartContext; 
    addProductToCart = async(productID)=>{
        const {addItemToCart} = this.context;
        const product = await addProductResolver(productID);
        addItemToCart(product);
    }
    render(){
        const {isSvgBtn, productID} = this.props;
        return(
            isSvgBtn? <Button className="add-to-chart" onClick={()=>this.addProductToCart(productID)}><ChartSVG /></Button>
                    : <Button className="add-to-chart notSvg" onClick={()=>this.addProductToCart(productID)}>Add to cart</Button>
           
        )
    }
}

export default AddToCartBtn;