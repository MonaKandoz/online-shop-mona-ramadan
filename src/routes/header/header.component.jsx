import React from "react";
import { Link, Outlet } from "react-router-dom";
import { connect } from "react-redux";

import Category from "../../components/category/category.component";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

import {ReactComponent as ReactLogo} from '../../images/logo.svg';
import { IoIosArrowDown } from "react-icons/io";
import { setIsCartOpen} from '../../store/cart/cart.action'

import './header.style.css';

class Header extends React.Component {
    render(){
    const { isCartOpen } = this.props;
        return(
            <React.Fragment>
                <nav className="header">
                    {/*navigation */}
                    <Category />
                    
                    {/*log*/}
                    <Link to="/" className="a-logo"><ReactLogo /></Link>

                    {/*actions*/}
                    <div className="header-action">
                        <div className="currency-change">
                            <span>$</span><IoIosArrowDown />
                        </div>
                        <CartIcon />
                    </div>
                    {isCartOpen && <CartDropdown />}
                </nav>
                <Outlet />
            </React.Fragment>
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
    setIsCartOpen
});

export default connect(mapStateToProps, mapDispatchToProps())(Header);