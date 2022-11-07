import React from 'react';
import {ReactComponent as ChartSVG} from '../../images/chart.svg';
import { CartContext } from '../../context/cart.context';

import './cart-icon.style.css'

class CartIcon extends React.Component{
    static contextType = CartContext;

    toggleIsCartOpen = ()=>{
        const { isCartOpen, setIsCartOpen } = this.context;
        const body = document.body;
        setIsCartOpen(!isCartOpen);
        body.classList.toggle("noscroll");       
    }
    render(){
        const {cartCount } = this.context;
        return(
            <div className="cart-icon" onClick={this.toggleIsCartOpen}>
                <ChartSVG />
                <span className='item-count'>{cartCount}</span>
            </div>
        )
    }
}

export default CartIcon;