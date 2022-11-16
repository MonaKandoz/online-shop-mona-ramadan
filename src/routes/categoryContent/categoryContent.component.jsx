import React from 'react';
import { addCategoryResolver } from '../../apollo/resolvers/resolvers'

import { ProductsContext } from '../../context/products.context';
import './categoryContent.style.css';

import ProductCard from '../../components/product-card/productcard.component';
import Spinner from '../../components/spinner/spinner.component';

export default class CategoryContent extends React.Component{
    static contextType = ProductsContext;
    constructor(props){
        super(props)
        this.state={
            isFetching: false,
            offset: 0,
            category: props.category
        }
        
    }
    componentWillMount(){
        if(!this.state.isFetching){
            this.addCategoryProduct(this.props.category);
        }
        window.addEventListener('scroll', this.loadMore);
    }
    
    componentWillUnmount(){
        window.removeEventListener('scroll', this.loadMore);
    }
      
    loadMore=()=>{
        if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight) {
            this.setState(prevState=>({isFetching: true, offset:prevState.offset+6}), 
            ()=>this.addCategoryProduct(this.props.category));
        }
    }

    addCategoryProduct = async(categoryTitle)=>{
        const { productsList, setProductsList} = this.context;
        let products = await addCategoryResolver(categoryTitle,this.state.offset,6);
        if(this.state.isFetching){
            products =[...productsList, ...products];
            if(products.length === productsList.length){
                window.removeEventListener('scroll', this.loadMore);
                return;
            }
            this.setState({isFetching:false});
        }
        setProductsList(products);
    }

    viewCategoryProducts = (category)=>{
        const {setProductsList } = this.context;
        this.setState(
            {category: category, offset : 0, isFetching: false}, 
            ()=>{
                setProductsList([]); 
                this.addCategoryProduct(category);
                window.addEventListener('scroll', this.loadMore);
            });
    }

    render(){
        const { loading, error, productsList } = this.context;
        const {category} = this.props;
        if(category !== this.state.category){
             this.viewCategoryProducts(category);
             return;
        }
        return(
            <>
            {
                loading? <Spinner />
                :
                <main>
                    <span className="category-name"> {category}</span>
                    
                    <div className="category-products">
                        {loading && <Spinner/>}
                        {productsList.map((product,index)=>(
                            <ProductCard key={`${product.id}_${index}`} product={product}></ProductCard>
                            ))
                        }
                        
                    </div>
                </main>
            }
            {error && <h1> Error! 🤕❌</h1>}
            </>
        )
    }
}