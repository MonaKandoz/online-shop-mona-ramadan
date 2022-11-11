import React from "react";

import {ReactComponent as VirticalDash} from '../../images/virtical-dash.svg';
import {ReactComponent as HorizontalDash} from '../../images/horizontal-dash.svg';
import Carousel from "../carousel/carousel.component";

import { CartContext } from '../../context/cart.context';
import './cart-item.style.css';

class CartItem extends React.Component{
    static contextType = CartContext;
    handleChange=(itemId, attributeId, selectedValue)=>{
        const {getSelectedAttribute} = this.context;
        getSelectedAttribute(itemId, attributeId, selectedValue)
    }

    render(){
        const { cartItem, isDropdown, isCart, } = this.props
        const { id, name, quantity, prices, brand, attributes, gallery} = cartItem;
        const productId = id;
        const {addItemToCart, removeItemFromCart, currencySelected} = this.context;
        console.log(prices)
        console.log(currencySelected)
        return(
            <div className="cart-product">
                <div className="cart-right">
                    <div className="item-info">
                        <span className="item-brand">{brand}</span>
                        <span className="item-name">{name}</span>
                        <span className='item-price' alt={prices[currencySelected].currency.label}>{prices[currencySelected].currency.symbol} {prices[currencySelected].amount}</span>
                        <div className="item-attribute">
                            {attributes.map((attribute, index) =>{
                                const{id, name, type, items} = attribute;
                                const attrId= id;
                                return(
                                    <div key={`${id}_${index}`} className={`attribute ${type}`}>
                                        <span>{name}:</span>
                                        <div className="attribute-inputs">
                                            {items.map((item, idx)=>(
                                                attribute.type === 'swatch'?
                                                <div>
                                                <input 
                                                    type="radio" 
                                                    name={`${productId}_${attrId}${isDropdown?'_dropdowen':''}`} 
                                                    value={item.value} id={`${productId}_${attrId}_${idx}`} 
                                                    checked={item.selected?'checked':''}  
                                                    disabled={isCart?true:false}
                                                    onChange={()=>this.handleChange(productId, attrId, item.value)}
                                                    /> 
                                                <label for={`${productId}_${attrId}_${idx}`} className="attr-val-swatch" style={{backgroundColor:`${item.value}`}} />
                                            </div>
                                            : 
                                            <div>
                                                <input 
                                                    type="radio" 
                                                    name={`${productId}_${attrId}${isDropdown?'_dropdowen':''}`} 
                                                    value={item.value} id={`${productId}_${attrId}_${idx}`} 
                                                    checked={item.selected?'checked':''} 
                                                    disabled={isCart?true:false}
                                                    onChange={()=>this.handleChange(productId, attrId, item.value)} 
                                                    />
                                                <label for={`${productId}_${attrId}_${idx}`} className="attr-val-text" >{item.value}</label>
                                            </div>                                                
                                            ))}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
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