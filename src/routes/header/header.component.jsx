import React from "react";
import { Link, Outlet } from "react-router-dom";

import Category from "../../components/category/category.component";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import { CartContext } from "../../context/cart.context";

import {ReactComponent as ReactLogo} from '../../images/logo.svg';
import { IoIosArrowDown } from "react-icons/io";

import './header.style.css';

export default class Header extends React.Component {
    static contextType = CartContext;
    render(){
    const { isCartOpen } = this.context;
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