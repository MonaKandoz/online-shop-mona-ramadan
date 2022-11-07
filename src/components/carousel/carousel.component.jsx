import React from "react";


import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';

import './carousel.style.css';

class Carousel extends React.Component{
    constructor(){
        super();
        this.state= {
            current: 0,
        }

    }
    nextSlide = (length,current) => {
        this.setState({current:current === length - 1 ? 0 : current + 1});
    };

    prevSlide = (length,current) => {
        this.setState({current:current === 0 ? length - 1 : current - 1});
    };
    
      
    render(){
        const {images} = this.props;
        const current = this.state.current;
        const length = images.length;
        if (!Array.isArray(images) || length <= 0) {
            return null;
        }
        return(
            <section className='carousel'>
                {images.length > 1 &&
                    <><span className='arrow left-arrow'>
                        <IoIosArrowBack onClick={()=>this.prevSlide(length,current)} />
                    </span>
                    <span className=' arrow right-arrow'>
                        <IoIosArrowForward onClick={()=>this.nextSlide(length,current)} />
                    </span></>
                }
                {images.map((image, index) => {
                    return (
                    <div 
                        className={`gallery_img ${index === current ? 'active' : ''}`}
                        key={`carousel_img_${index}`} style={{backgroundImage:`url(${image})`}}
                    >
                    </div>
                    );
                })}
            </section>
        )
    }
}

export default Carousel;