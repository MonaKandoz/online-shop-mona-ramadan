import React from "react";
import './category.style.css';

export default class Category extends React.Component {
    constructor(){
        super();
        this.state= {
            category:[
                {
                    id: '1',
                    name: 'women',
                    selected: true
                },
                {
                    id: '2',
                    name: 'men',
                    selected: false
                },
                {
                    id: '3',
                    name: 'kids',
                    selected: false
                }
            ]
        }
    }
    render(){
        return(
            <div className="header-category">
                {this.state.category.map(categoryItem=>(
                    <div key={`category_${categoryItem.id}`} className={`${categoryItem.selected?'active':''} category`} >{categoryItem.name}</div>
                ))}
            </div>
        )
    }
}