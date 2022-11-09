import React from "react";
import { connect } from "react-redux";

import {ReactComponent as VirticalDash} from '../../images/virtical-dash.svg';
import {ReactComponent as HorizontalDash} from '../../images/horizontal-dash.svg';
import Carousel from "../carousel/carousel.component";

import './cart-item.style.css';
import { removeItemFromCart,
    getSelectedAttribute,
    addItemToCart} from '../../store/cart/cart.action'

class CartItem extends React.Component{
    handleChange=(itemId, attributeId, selectedValue)=>{
        const {getSelectedAttribute, cartItems} = this.props;
        getSelectedAttribute(cartItems, itemId, attributeId, selectedValue)
    }

    render(){
        const { cartItems, cartItem, isDropdown, isCart, addItemToCart, removeItemFromCart} = this.props
        const { id, name, quantity, prices, brand, attributes, gallery} = cartItem;
        const productId = id;
        return(
            <div className="cart-product">
                <div className="cart-right">
                    <div className="item-info">
                        <span className="item-brand">{brand}</span>
                        <span className="item-name">{name}</span>
                        <span className='item-price' alt={prices[0].currency.label}>{prices[0].currency.symbol}{prices[0].amount}</span>
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
                        <span className="item-increase" onClick={()=>addItemToCart(cartItems, cartItem)}>
                            <HorizontalDash />
                            <VirticalDash />
                            </span>
                        <span className="item-quantitiy">{quantity}</span>
                        <span className="item-decrease" onClick={()=>removeItemFromCart(cartItems, cartItem)}><HorizontalDash /></span>
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


const mapStateToProps = function(state) {
    return {
        isCartOpen: state.cart.isCartOpen,
        cartItems: state.cart.cartItems, 
        cartCount: state.cart.cartCount, 
        cartTotal: state.cart.cartTotal
    }
};

const mapDispatchToProps = () => ({ 
    removeItemFromCart,
    getSelectedAttribute,
    addItemToCart
});

export default connect(mapStateToProps, mapDispatchToProps())(CartItem);