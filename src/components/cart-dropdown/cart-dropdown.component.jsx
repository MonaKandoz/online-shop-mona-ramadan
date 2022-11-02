import React from "react";

import Button from "../button/button.component";
import { CartContext } from '../../context/cart.context';
import './cart-dropdown.style.css';

class CartDropdown extends React.Component{
    static contextType = CartContext;

    componentDidMount(){
        const cartDropdownElement = document.querySelector(".cart-dropdown-container");
        const cartIconElement = document.querySelector(".cart-icon");
        const { setIsCartOpen } = this.context;
        const body = document.body;

        document.addEventListener("mousedown", (event) => {
            if (cartDropdownElement.contains(event.target) ) {
                setIsCartOpen(true);
                body.classList.add("noscroll"); 
            }else if(!cartIconElement.contains(event.target)){
                setIsCartOpen(false);
                body.classList.remove("noscroll"); 
            }
        });
    }
    closeCartDropDown = ()=>{
console.log('hi')
    }
    render(){
        return(
            <div className="page-overlay">
                <div className="cart-dropdown-container" >
                    <div className="cart-header"><span>My Bag,</span> 3 items</div>
                    <div className="cart-item"></div>
                    <div className="total-price">
                        <span>total</span>
                        <span>$200.00</span>
                    </div>
                    <div className="button-group">
                        <Button buttonType="viewBag" >View Bag</Button>
                        <Button buttonType="checkOut" >Check Out</Button>
                    </div>
                </div>
            </div>
            
        )
    }

}

export default CartDropdown;