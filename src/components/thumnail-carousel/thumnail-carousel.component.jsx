import React from "react";

import './thumnail-carousel.style.css';

class ThumnailCarousel extends React.Component{
    constructor(props){
        super(props);

        this.state={
            imgUrlIdx: 0
        }
    }
    changePreviewImg= (idx)=>{
        this.setState({imgUrlIdx:idx})
    }

    render(){
        const {galleryImg, inStock} = this.props;

        return(
            <div className="thumnail-carousel">
                <div className="Img-thumnail">
                    {galleryImg.map((imgUrl,idx)=>(
                        <div key={`thumnail_${idx}`} className="thumnail" style={{backgroundImage:`url(${imgUrl})`}} onClick={()=>this.changePreviewImg(idx)}></div>
                    ))}
                </div>
                <div className="preview-side">
                    {!inStock && <span className="outStock">out of Stock</span>}
                    <div className="img-preview" style={{backgroundImage:`url(${galleryImg[this.state.imgUrlIdx]})`}}></div>
                </div>
            </div>
        )
    }
}

export default ThumnailCarousel;