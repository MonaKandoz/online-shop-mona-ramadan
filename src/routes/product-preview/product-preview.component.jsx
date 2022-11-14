import React from "react";
import { useParams } from 'react-router-dom';
import { addProductResolver } from "../../apollo/resolvers/resolvers"; 

import ItemInfo from "../../components/item-info/item-info.component";
import Spinner from "../../components/spinner/spinner.component";
import Button from "../../components/button/button.component";
import ThumnailCarousel from "../../components/thumnail-carousel/thumnail-carousel.component";

import { CartContext } from '../../context/cart.context';
import './product-preview.style.css';

function withRouter(Children){
    return(props)=>{
       const match  = useParams();
       return <Children {...props}  match = {match}/>
   }
 }

class ProductPreview extends React.Component{
    static contextType = CartContext;
    constructor(props){
        super(props);
        this.state ={
            product:{}
        }
        
        const productID = props.match.productId;
        this.getProductInfo(productID);
    }
    setItem(product){
        const {setItemToAdd} = this.context;
        setItemToAdd(product)
    }
    getProductInfo = async(productID)=>{
        let product = await addProductResolver(productID);
        console.log(product)
        
        var selectedAttr = '';
        const newAttributes = product.attributes.map((attribute, index) =>{
            console.log(product.attributes.length);
            const newItem = attribute.items.map((item, index) =>{
                if(index === 0) {
                    selectedAttr+= item.value;
                    return {...item, selected:true}
                }
                return  {...item, selected:false}
            });
            return {...attribute, items: newItem}
        });
        product.attributes = newAttributes;
        product.selectedAttr=selectedAttr;
        console.log(product)
        this.setState({product: product},()=>this.setItem(this.state.product))
    }
    addProductToCart = ()=>{
        const { itemToAdd, addItemToCart } = this.context;
        addItemToCart(itemToAdd);
    }
    render(){
        const product = this.state.product;
        const galleryImg = product.gallery;
        const inStock = product.inStock;
        return (
            <>
                {product.id?
                <div className="preview-page">
                    <div className="right-side">
                        <ThumnailCarousel galleryImg={galleryImg} inStock={inStock} />
                    </div>
                    <div className="left-side">
                        <ItemInfo item={product} preview />
                        <Button buttonType="checkOut" onClick={()=>this.addProductToCart()}>Add to cart</Button>
                        <div className="prodct-description" dangerouslySetInnerHTML={{__html: product.description}}>
                        </div>
                    </div>
                </div>
                :
                <Spinner />
                }
            </>
        )
    }
}

export default withRouter(ProductPreview);