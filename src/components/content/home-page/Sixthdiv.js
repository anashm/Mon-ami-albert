import React , { useEffect , useState } from 'react'
import './Sixthdiv.css';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import Testimony from './TestimonySection/Testimony/Testimony';
import Title from '../../general/Title/Title';

import Aos from 'aos';




export default function Sixthdiv() {

    const text_slider = [
        {
            title : 'Sarah S',
            text : 'les nombreux exercices et annales mis à disposition sur le site, m’ont permis de travailler d’avantage et de progresser assez vite. C’est un véritable complément de travail.'
        },
        {
            title : 'Marie K.',
            text : 'Mon Ami Albert est une super appli quand il s’agit de s’entrainer et de compléter les cours donnés par nos professeurs en classe.'
        },
        {
            title : 'SIHAME H.',
            text : 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat.'
        },
        {
            title : 'Julien M.',
            text : 'Ce que j’aime en particulier chez Mon Ami Albert c’est la qualité du contenu proposé, on y trouve des millier d’exercices qui s’adapte à tous les niveaux avec leurs corrigés.'
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
        Aos.init({
            duration: 1500,
        });

        window.addEventListener('resize' , e => handleResize(e.currentTarget.innerWidth) );

        handleResize(window.innerWidth);

        return () => {
            window.removeEventListener('resize' , e => handleResize(e.currentTarget.innerWidth) );
        }

    } , []);


    return (
        <section className = 'container-fluid testimony-section-container' data-aos= 'fade-up'  data-aos-once= 'false' >
            <div className="container">
                <div className="row" data-aos= 'fade-up' data-aos-delay = '400' data-aos-once= 'true' >
                    <Title text = "C'EST VOUS QUI EN PARLEZ LE MIEUX" textcentered centerOverlined />
                </div>
                <div className = 'testimonies-container'data-aos= 'fade' data-aos-delay = '800' data-aos-once= 'true' > 
                    <Slider {...settings}>
                        { text_slider.map( (slide) => <Testimony name = { slide.title }  text = { slide.text } />) }
                    </Slider>
                </div>
            </div>
        </section>
    )
}
