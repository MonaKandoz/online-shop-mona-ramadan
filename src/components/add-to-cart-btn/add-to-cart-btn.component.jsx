import React from "react";
import { connect } from "react-redux";

import './add-to-cart-btn.style.css';

import {ReactComponent as ChartSVG} from '../../images/chart.svg';
import Button from "../button/button.component";
import { addItemToCart} from '../../store/cart/cart.action';

class AddToCartBtn extends React.Component{
    addProductToCart = (product)=>{
        const {cartItems, addItemToCart} = this.props;
        addItemToCart(cartItems, product)
    }
    render(){
        const {isSvgBtn, product} = this.props;
        return(
            isSvgBtn? <Button className="add-to-chart" onClick={()=>this.addProductToCart(product)}><ChartSVG /></Button>
                    : <Button className="add-to-chart notSvg" onClick={()=>this.addProductToCart(product)}>Add to cart</Button>
           
        )
    }
}
const mapStateToProps = function(state) {
    return {
        cartItems: state.cart.cartItems,
    }
};
const mapDispatchToProps = () => ({ 
    addItemToCart
});

export default connect(mapStateToProps, mapDispatchToProps())(AddToCartBtn);