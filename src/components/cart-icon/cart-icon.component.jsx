import React from 'react';
import {ReactComponent as ChartSVG} from '../../images/chart.svg';
import { connect } from 'react-redux';

import './cart-icon.style.css';
import { setIsCartOpen} from '../../store/cart/cart.action'

class CartIcon extends React.Component{
    toggleIsCartOpen = ()=>{
        const { isCartOpen, setIsCartOpen } = this.props;
        
        const body = document.body;
        setIsCartOpen(!isCartOpen);
        body.classList.toggle("noscroll");       
    }
    render(){
        const { cartCount } = this.props;
        return(
            <div className="cart-icon" onClick={this.toggleIsCartOpen}>
                <ChartSVG />
                <span className='item-count'>{cartCount}</span>
            </div>
        )
    }
}

const mapStateToProps = function(state) {
    return {
        isCartOpen: state.cart.isCartOpen,
        cartCount: state.cart.cartCount,
    }
};

const mapDispatchToProps = () => ({ 
    setIsCartOpen
});

export default connect(mapStateToProps, mapDispatchToProps())(CartIcon);