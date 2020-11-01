import React from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import  './ImageSlider.css';

function ImageSlider(props) {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
      autoplaySpeed: 2000,      
      };
    return (
        <div>
            <Slider {...settings}>
                {props.images.map((image,index)=>(
                    <img height='160px' alt='beautiful' key={index} src={image} />
                ))}
            </Slider>    
        </div>
    )
}

export default ImageSlider
