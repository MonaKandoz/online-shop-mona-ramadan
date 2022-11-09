import React from "react";

import './add-to-cart-btn.style.css';

import { CartContext } from "../../context/cart.context";
import {ReactComponent as ChartSVG} from '../../images/chart.svg';
import Button from "../button/button.component";

class AddToCartBtn extends React.Component{
    static contextType = CartContext; 
    addProductToCart = (product)=>{
        const {addItemToCart} = this.context;
        addItemToCart(product)
    }
    render(){
        const {isSvgBtn, product} = this.props;
        return(
            isSvgBtn? <Button className="add-to-chart" onClick={()=>this.addProductToCart(product)}><ChartSVG /></Button>
                    : <Button className="add-to-chart notSvg" onClick={()=>this.addProductToCart(product)}>Add to cart</Button>
           
        )
    }
}

export default AddToCartBtn;