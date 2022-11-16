import React from "react";

import { CartContext } from '../../context/cart.context';
import './item-info.style.css';

class ItemInfo extends React.Component{
    static contextType = CartContext;
    constructor(props){
        super(props);
        this.state={
            item:props.item
        }
    }
    handleChange= (item, attributeId, selectedValue)=>{
        const {setItemToAdd} = this.context;
        var selectedAttr = '';
        const newAttributes = item.attributes.map((attribute, index) =>{
            if(attribute.id === attributeId){
                const newItem =attribute.items.map((item) =>{
                    if(item.value === selectedValue){
                        selectedAttr+= item.value;
                         return {...item, selected:true}
                    }
                    return  {...item, selected:false}
                });
                
                return {...attribute, items: newItem}
            }else{
                attribute.items.map((item) =>{
                    if(item.selected){
                        selectedAttr+= item.value;
                    }
                    return {...attribute}
                });
            }
            return {...attribute}
        });
        
        this.setState({item: {...item, attributes:newAttributes,selectedAttr:selectedAttr}},
            ()=>setItemToAdd(this.state.item)
            );
    }

    componentDidMount(){
        
        if(this.props.preview){
            const item = this.state.item;
            const newAttributes = item.attributes.map((attribute, index) =>{
                const newItem = attribute.items.map((item, index) =>{
                    if(index === 0) return {...item, selected:true}
                    return  {...item, selected:false}
                });
                return {...attribute, items: newItem}
            });
            
            this.setState({item:{...item, attributes:newAttributes}})
        }
    }
    render(){
        const productItem = this.state.item;
        const { isDropdown, isCart, preview } = this.props
        const { id, name, prices, brand, attributes, selectedAttr} = productItem;
        const productId = id;
        const {currencySelected} = this.context;
        return(
            <div className="item-info">
                        <span className="item-brand">{brand}</span>
                        <span className="item-name">{name}</span>
                        {!preview && <span className='item-price' alt={prices[currencySelected].currency.label}>{prices[currencySelected].currency.symbol} {prices[currencySelected].amount}</span>}
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
                                                    name={`${productId}_${attrId}_${selectedAttr}${isDropdown?'_dropdowen':''}`} 
                                                    value={item.value} 
                                                    id={`${productId}_${attrId}_${selectedAttr}_${idx}${isDropdown?'_dropdowen':''}`} 
                                                    checked={item.selected?'checked':''}  
                                                    disabled={isCart?true:false}
                                                    onChange={()=>this.handleChange(productItem, attrId, item.value)}
                                                    /> 
                                                <label htmlFor={`${productId}_${attrId}_${selectedAttr}_${idx}${isDropdown?'_dropdowen':''}`} className="attr-val-swatch" style={{backgroundColor:`${item.value}`}} />
                                            </div>
                                            : 
                                            <div>
                                                <input 
                                                    type="radio" 
                                                    name={`${productId}_${attrId}_${selectedAttr}${isDropdown?'_dropdowen':''}`} 
                                                    value={item.value} 
                                                    id={`${productId}_${attrId}_${selectedAttr}_${idx}${isDropdown?'_dropdowen':''}`} 
                                                    checked={item.selected?'checked':''} 
                                                    disabled={isCart?true:false}
                                                    onChange={()=>this.handleChange(productItem, attrId, item.value)} 
                                                    />
                                                <label htmlFor={`${productId}_${attrId}_${selectedAttr}_${idx}${isDropdown?'_dropdowen':''}`} className="attr-val-text" >{item.value}</label>
                                            </div>                                                
                                            ))}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        {preview &&
                        <div className="price-section">
                            <span className="price-title">Price:</span>
                            <span className='item-price' alt={prices[currencySelected].currency.label}>{prices[currencySelected].currency.symbol} {prices[currencySelected].amount}</span>
                        </div>
                        }
                    </div>
        )
    }
}

export default ItemInfo;