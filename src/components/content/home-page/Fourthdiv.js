import React from 'react';
import './Fourthdiv.css';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import image_slide_1 from '../../../images/Ellipse_5.png';
import image_slide_2 from '../../../images/Ellipse_6.png';
import image_slide_3 from '../../../images/Ellipse_7.png';
import image_slide_4 from '../../../images/Ellipse_6.png';
import image_slide_5 from '../../../images/Ellipse_7.png';
import image_slide_6 from '../../../images/Ellipse_5.png';


function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "#c4c4c4" }}
        onClick={onClick}
      />
    );
  }
  
  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "#c4c4c4" }}
        onClick={onClick}
      />
    );
  }

const photos = [
    {
        name : 'PROFESSEUR OTHMANE',
        url : image_slide_1,
        text : 'Lorem ipsum dolor sit amet, consetetur sadipscing.'
    },
    {
        name : 'PROFESSEUR ABDESSAMAD',
        url : image_slide_2,
        text : 'Lorem ipsum dolor sit amet, consetetur sadipscing.'
    },
    {
        name : 'PROFESSEUR HAJAR',
        url : image_slide_3,
        text : 'Lorem ipsum dolor sit amet, consetetur sadipscing.'
    },
    {
        name : 'PROFESSEUR HAJAR',
        url : image_slide_4,
        text : 'Lorem ipsum dolor sit amet, consetetur sadipscing.'
    },
    {
        name : 'PROFESSEUR HAJAR',
        url : image_slide_5,
        text : 'Lorem ipsum dolor sit amet, consetetur sadipscing.'
    },
    {
        name : 'PROFESSEUR HAJAR',
        url : image_slide_6,
        text : 'Lorem ipsum dolor sit amet, consetetur sadipscing.'
    },
]

export default function Fourthdiv() {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
      };
    return (
        <div  style={{background:'#FAFAFA',marginTop:'30px'}}>
            <br></br><br></br>
             <h5 className="title_page"><center><hr className="hr"></hr> QUI CONCOIVENT LES COURS ? </center></h5>
            <div className="container">
                
                 <div style={{padding:50}}>  
                    <Slider {...settings}>
                        { photos.map( (photo) => {
                            return(
                                <div>
                                    <img src={photo.url} width='60%' style={{margin:'20%'}} />
                                    <span className="slide_title">{photo.name}</span>
                                    <p className="text_slide" >{photo.text}</p>
                                </div>
                            )
                            
                        }) }
                    </Slider>
                </div> 
            </div>
            
        </div>
    )
}
