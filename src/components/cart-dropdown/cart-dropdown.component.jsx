import React from "react";
import { Link } from "react-router-dom";

import {ReactComponent as ChartSVG} from '../../images/chart.svg';
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
      
      componentDidUpdate(){
        const {setCurrencySelected, setCurrencySymbol } = this.context;
        const {currencyIndx, symbol} = this.props;

        setCurrencySelected(currencyIndx);
        setCurrencySymbol(symbol);      
      }

      componentWillUnmount() {
        document.removeEventListener("mousedown", this.handleClickOutside);
      }
      
      toggleIsCartOpen = ()=>{
        const { isCartOpen, setIsCartOpen } = this.context;
        const body = document.body;

        setIsCartOpen(!isCartOpen);
        body.classList.toggle("noscroll"); 

        }
      handleClickOutside=(event)=> {
        const { isCartOpen,setIsCartOpen } = this.context;
        const body = document.body;
        const cartIcon = document.querySelector('.cart-icon');
        if(cartIcon.contains(event.target)){
            return;
        }
        else if (isCartOpen && this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
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
        const { isCartOpen, cartItems, cartCount, cartTotal, currencySymbol } =this.context;
        return(
            <>
                <div className="cart-icon" onClick={this.toggleIsCartOpen}>
                    <ChartSVG />
                    <span className='item-count'>{cartCount}</span>
                </div>
                {
                    isCartOpen &&
                    <div className="page-overlay">
                        <div ref={this.wrapperRef} className="cart-dropdown-container" >
                            <div className="cart-header"><span>My Bag,</span> {cartCount} {cartCount===1? 'item' : 'items'}</div>
                            <div className="cart-item">
                                {cartItems.map((item)=>(
                                    <CartItem key={item.id} cartItem={item} isDropdown isCart />
                                ))}
                            </div>
                            <div className="total-price">
                                <span>total</span>
                                <span>{currencySymbol} {cartTotal}</span>
                            </div>
                            <div className="button-group">
                                <Link to='/cart' onClick={()=> this.navigateToCart()}><Button buttonType="viewBag" >View Bag</Button></Link>
                                <Button buttonType="checkOut" >Check Out</Button>
                            </div>
                        </div>
                    </div>
                }
            </>
            
             
        )
    }

}

export default CartDropdown;