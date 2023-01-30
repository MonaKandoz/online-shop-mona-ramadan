import { createContext, useState, useEffect } from "react";
import { gql, useQuery } from "@apollo/client";

const CURRENCIES = gql`
    query{
        currencies{
            label
            symbol
        }
    }
`;
function getInitialState() {
    const currency = localStorage.getItem('currency');
    if(currency === null){
        return 0
    }
    return JSON.parse(currency) 
  }
export const CurrencyContext = createContext({
    isCurrencyOpen: false,
    setIsCurrencyOpen: ()=>{},
    currencyList: [],
    currency: 0
});

export const CurrencyProvidor = ({children})=>{
    const {data} = useQuery(CURRENCIES);
    const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);
    const [currencyList, setCurrencyList] = useState([]);
    const [currency, setCurrency] = useState(getInitialState);

    useEffect(()=>{
        if(data){
            setCurrencyList(data.currencies);
        }
    },[data]);

    useEffect(()=>{
        localStorage.setItem('currency', JSON.stringify(currency));
        console.log(currency)
    },[currency])

    const value = {
        isCurrencyOpen, 
        setIsCurrencyOpen,
        currencyList, 
        setCurrencyList,
        currency,
        setCurrency
        };

    return(
        <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>
    )

};