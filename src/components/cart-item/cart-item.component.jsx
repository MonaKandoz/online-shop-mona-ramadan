import React from "react";

import {ReactComponent as VirticalDash} from '../../images/virtical-dash.svg';
import {ReactComponent as HorizontalDash} from '../../images/horizontal-dash.svg';
import Carousel from "../carousel/carousel.component";
import ItemInfo from "../item-info/item-info.component";

import { CartContext } from '../../context/cart.context';
import './cart-item.style.css';

class CartItem extends React.Component{
    static contextType = CartContext;    
    render(){
        const cartItem = this.props.cartItem;
        const { isDropdown } = this.props
        const {id, name, quantity, gallery} = cartItem;
        const {addItemToCart, removeItemFromCart, currencySelected} = this.context;
        console.log(cartItem)
        console.log(currencySelected)
        return(
            <div className="cart-product">
                <div className="cart-right">
                    <ItemInfo key={id} item={cartItem} isDropdown={isDropdown} isCart/>
                </div>
                <div className="cart-left">
                    <div className="item-increase-decrease">
                        <span className="item-increase" onClick={()=>addItemToCart(cartItem)}>
                            <HorizontalDash />
                            <VirticalDash />
                            </span>
                        <span className="item-quantitiy">{quantity}</span>
                        <span className="item-decrease" onClick={()=>removeItemFromCart(cartItem)}><HorizontalDash /></span>
                    </div>
                    <div className="item-gallary">
                    {isDropdown?
                        <div className="gallery_img" style={{backgroundImage:`url(${gallery[0]})`}}></div>
                        :
                        <Carousel  images={gallery} name={name} />
                    }
                    </div>
                </div>
            </div>
        )
    }
}

export default CartItem;