import React from "react";

import { CurrencyContext } from "../../context/currency.context";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import './currency-drop-down.style.css'

class CurrencyDropDown extends React.Component{
    static contextType = CurrencyContext;
    constructor(props){
        super(props);
    
        this.wrapperRef = React.createRef();
    }
    
    
    componentDidMount() {
        document.addEventListener("click", this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener("click", this.handleClickOutside);
    }

    handleClickOutside=(event)=> {
        const { isCurrencyOpen,setIsCurrencyOpen } = this.context;
        const currencyIcon = document.querySelector('.currency-change');
        if(currencyIcon.contains(event.target)){
            setIsCurrencyOpen(!isCurrencyOpen);      
        }else if (isCurrencyOpen && this.wrapperRef && !this.wrapperRef.current.contains(event.target)){
            setIsCurrencyOpen(false);
        }
    }

    changeCurrency= (idx)=>{
        const { setCurrency, setIsCurrencyOpen } = this.context;
        setCurrency(idx);
        setIsCurrencyOpen(false);
    }
    render(){
        const { isCurrencyOpen, currency, currencyList} = this.context;
        
        return(
            <>
                <div className="currency-change">
                    <span>{currencyList.length? currencyList[currency].symbol: '$'}</span>
                    {isCurrencyOpen?<IoIosArrowUp />:<IoIosArrowDown />}
                </div>
                {
                    isCurrencyOpen &&
                    <div ref={this.wrapperRef} className="currency-drop-down">
                        <ul>
                        {
                            currencyList.map((item, idx)=>(
                                <li className={currency === idx? 'selected':''} key={`currency_${idx}`} onClick={()=>this.changeCurrency(idx)}><span className="currency-symbol">{item.symbol}</span> <span className="currency-label">{item.label}</span></li>
                            ))
                        }
                        </ul>
                    </div>
                }
            </>
        )
    }
}

export default CurrencyDropDown;