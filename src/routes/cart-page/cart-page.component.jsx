import React from "react";

import CartItem from "../../components/cart-item/cart-item.component";
import Button from "../../components/button/button.component";

import { CartContext } from '../../context/cart.context';
import './cart-page.style.css';

class CartPage extends React.Component{
    static contextType = CartContext;
    
    render(){
        const { cartItems, cartCount, cartTotal } = this.context;
        return(
            <div className="cart-page-content">
                <span className="cart-page-header">Cart</span>
                <div className="cart-item">
                        {cartItems.map((item)=>(
                            <CartItem key={item.id} cartItem={item} />
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

export default CartPage;