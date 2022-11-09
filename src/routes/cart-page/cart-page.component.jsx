import React from "react";
import { connect } from 'react-redux';

import CartItem from "../../components/cart-item/cart-item.component";
import Button from "../../components/button/button.component";

import './cart-page.style.css';

class CartPage extends React.Component{
    render(){
        const { cartItems, cartCount, cartTotal } = this.props;
        return(
            <div className="cart-page-content">
                <span className="cart-page-header">Cart</span>
                <div className="cart-item">
                        {cartItems.map((item)=>(
                            <CartItem key={item.id} cartItem={item}  isCart/>
                        ))}
                </div>
                <div className="cart-footer">
                    <div className="tax">Taxt 21%:</div> <span>${((cartTotal / 100) * 21).toFixed(2)}</span>
                    <div className="tax">Quantity:</div> <span>{cartCount} </span>
                    <div className="tax">Total: </div> <span>${cartTotal}</span>
                    <Button buttonType="checkOut" >Order</Button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = function(state) {
    return {
        isCartOpen: state.cart.isCartOpen,
        cartItems: state.cart.cartItems, 
        cartCount: state.cart.cartCount, 
        cartTotal: state.cart.cartTotal
    }
};

export default connect(mapStateToProps)(CartPage);