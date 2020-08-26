import React , { useEffect , useState } from 'react';
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

import Instructor from './Instructors/Instructor/Instructor';
import Title from '../../general/Title/Title';
import Aos from 'aos';

/* function SampleNextArrow(props) {
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
  } */

const instructors = [
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

 const Fourthdiv = () => {
    const [ settings , setSettings ] = useState({
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
    })

    const handleResize = (size) => {
        console.log('triggered')
        if(size < 451){
            setSettings({
                ...settings,
                slidesToShow: 1,
            })
        }else if(size < 768 ){
            setSettings( prev =>  ({
                ...prev,
                slidesToShow: 2,
            }))
        }else{
            setSettings({
                ...settings,
                slidesToShow: 3,
            })
        }
    }

    useEffect(() => {
        Aos.init({
            duration: 2000
        });
        window.addEventListener('resize' , e => handleResize(e.currentTarget.innerWidth) );
        handleResize(window.innerWidth);
    } , []);

    return (
        <section  className = 'container-fluid instructors-card-container'>
            <div className="container">
                <div className="row">
                    <Title 
                    animation = 'fade'
                    once = 'false'
                    text = 'QUI CONCOIVENT LES COURS ? ' textcentered centerOverlined />
                </div>
                <div className = 'slider-container' data-aos= 'fade' data-aos-delay={400} data-aos-once='false'>  
                    <Slider {...settings}>
                        { instructors.map( (instructor , index) => <Instructor key = {index} img = { instructor.url } name = { instructor.name} description = { instructor.text } />) }
                    </Slider>
                </div> 
            </div>
        </section>
    );
}

export default Fourthdiv;
