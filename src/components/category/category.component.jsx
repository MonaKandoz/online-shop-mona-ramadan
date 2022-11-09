import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

import './category.style.css';

import SHOP_DATA from "../../shop_data.json";
import { setCategories } from '../../store/categories/category.action';
class Category extends React.Component {
    constructor(props){
        super(props);
        props.setCategories(SHOP_DATA[0].categories);
    }

    render(){
        const categories = this.props.categories;
        return(
            <div className="header-category">
                {categories.map(categoryItem=>{
                    const name = categoryItem.name;
                    return(
                        <NavLink key={`category_${name}`} to={`/${name}`} className='category' >{name}</NavLink>
                )})}
            </div>
        )
    }
};

const mapStateToProps = function(state) {
    return {
        categories: state.categories.categories
    }
};
const mapDispatchToProps = () => ({ 
    setCategories
});


export default connect(mapStateToProps, mapDispatchToProps())(Category)