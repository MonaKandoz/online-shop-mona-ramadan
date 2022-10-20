import React from 'react';

import './bodyContent.style.css';

export default class BodyContent extends React.Component{
    render(){
        return(
            <main>
                <div className="category-name"> Women</div>
                <div className="category-products">
                    <div className="product">
                        <div className="product-img">
                            <img src="#" alt='prodct-name' />
                            <div className="out-of-stock"></div>
                            <span className="add-to-chart">chartIcon</span>
                        </div>
                        <span className="product-price">100$</span>
                        <div className="product-name">prodct-name</div>

                    </div>
                </div>
            </main>
        )
    }
}