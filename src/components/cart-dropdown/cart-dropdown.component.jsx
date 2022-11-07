import React from "react";
import { Link } from "react-router-dom";

import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";

import { CartContext } from '../../context/cart.context';
import './cart-dropdown.style.css';

class CartDropdown extends React.Component{
    static contextType = CartContext;
    constructor(props){
        super(props);
    
        this.wrapperRef = React.createRef();
      }
      componentDidMount() {
        document.addEventListener("mousedown", this.handleClickOutside);
      }
    
      componentWillUnmount() {
        document.removeEventListener("mousedown", this.handleClickOutside);
      }
    
      handleClickOutside=(event)=> {
        const { setIsCartOpen } = this.context;
        const body = document.body;
        const cartIcon = document.querySelector('.cart-icon');
        if(cartIcon.contains(event.target)){
            return;
        }
        else if ((this.wrapperRef && !this.wrapperRef.current.contains(event.target))) {
            setIsCartOpen(false);
            body.classList.remove("noscroll");
        }
      }
      navigateToCart = ()=>{
        const { setIsCartOpen } = this.context;
        const body = document.body;
        setIsCartOpen(false);
        body.classList.remove("noscroll"); 
      }
    
    render(){
        const { cartItems, cartCount, cartTotal } = this.context;
        return(
            <div className="page-overlay">
                <div ref={this.wrapperRef} className="cart-dropdown-container" >
                    <div className="cart-header"><span>My Bag,</span> {cartCount} items</div>
                    <div className="cart-item">
                        {cartItems.map((item)=>(
                            <CartItem key={item.id} cartItem={item} isDropdown/>
                        ))}
                    </div>
                    <div className="total-price">
                        <span>total</span>
                        <span>${cartTotal}</span>
                    </div>
                    <div className="button-group">
                        <Link to='/cart' onClick={()=> this.navigateToCart()}><Button buttonType="viewBag" >View Bag</Button></Link>
                        <Button buttonType="checkOut" >Check Out</Button>
                    </div>
                </div>
            </div>
             
        )
    }

}

export default CartDropdown;