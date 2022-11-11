import React from "react";
import { Link, Outlet } from "react-router-dom";

import Category from "../../components/category/category.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import CurrencyDropDown from "../../components/currency-drop-down/currency-drop-down.component"
import { CurrencyContext } from "../../context/currency.context";

import {ReactComponent as ReactLogo} from '../../images/logo.svg';

import './header.style.css';

export default class Header extends React.Component {
    static contextType = CurrencyContext;
    render(){
        const { currency ,currencyList } = this.context;
        console.log(currencyList)
        var symbol = currencyList.length? currencyList[currency].symbol:'$';
        return(
            <React.Fragment>
                <nav className="header">
                    {/*navigation */}
                    <Category currencyIndx={currency} />
                    
                    {/*log*/}
                    <Link to="/" className="a-logo"><ReactLogo /></Link>

                    {/*actions*/}
                    <div className="header-action">
                        <CurrencyDropDown/>
                        <CartDropdown currencyIndx={currency} symbol={symbol} />
                    </div>
                </nav>
                <Outlet />
            </React.Fragment>
        )
    }

}