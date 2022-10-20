import React from "react";

import Category from "../category/category.component";
import {ReactComponent as ReactLogo} from '../../images/logo.svg';
import {ReactComponent as ChartSVG} from '../../images/chart.svg';
import { IoIosArrowDown } from "react-icons/io";

import './header.style.css';

export default class Header extends React.Component {
    render(){
        return(
            <nav className="header">
                {/*navigation */}
                <Category />
                
                {/*log*/}
                <div className="a-logo"><ReactLogo /></div>

                {/*actions*/}
                <div className="header-action">
                    <div className="currency-change">
                        <span>$</span><IoIosArrowDown />
                    </div>
                    <div className="chartIcon">
                        <ChartSVG />
                    </div>
                </div>
            </nav>
        )
    }

}