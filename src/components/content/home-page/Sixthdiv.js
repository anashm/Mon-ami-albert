import React from 'react'
import './Sixthdiv.css';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";


const text_slider = [
    {
        title : 'FATINE S.',
        text : 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat.'
    },
    {
        title : 'SALMA M.',
        text : 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat.'
    },
    {
        title : 'SIHAME H.',
        text : 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat.'
    },
    {
        title : 'RIM T.',
        text : 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat.'
    },

]

export default function Sixthdiv() {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
       
      };
    return (
        <div style={{background:'#FAFAFA',marginTop:'30px'}}>
            <br></br><br></br><br></br>
             <h5 className="title_page"><center><hr className="hr"></hr> C'EST VOUS QUI EN PARLEZ LE MIEUX</center></h5>
            <div className="container">
                <div style={{padding:50}}> 
                    <Slider {...settings}>
                        { text_slider.map( (slide) => {
                            return(
                                <div>
                                    
                                    <span className="slide_title">{slide.title}</span>
                                    <br></br><br></br>
                                    <p className="text_slide" >{slide.text}</p>
                                </div>
                            )
                            
                        }) }
                    </Slider>
                </div>
            </div>
        </div>
    )
}
