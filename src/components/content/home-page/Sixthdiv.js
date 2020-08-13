import React , { useEffect , useState } from 'react'
import './Sixthdiv.css';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import Testimony from './TestimonySection/Testimony/Testimony';
import Title from '../../general/Title/Title';




export default function Sixthdiv() {

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
    
    ];


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
        window.addEventListener('resize' , e => handleResize(e.currentTarget.innerWidth) );
        handleResize(window.innerWidth);
    } , []);


    return (
        <div className = 'container-fluid testimony-section-container'>
            <div className="container">
                <div className="row">
                    <Title text = "C'EST VOUS QUI EN PARLEZ LE MIEUX" textcentered centerOverlined />
                </div>
                <div className = 'testimonies-container'> 
                    <Slider {...settings}>
                        { text_slider.map( (slide) => <Testimony />) }
                    </Slider>
                </div>
            </div>
        </div>
    )
}
