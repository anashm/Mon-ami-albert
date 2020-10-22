import React , { useEffect } from 'react';
import Title from '../../../general/Title/Title';
import FreeChapterButtonLink from './FreeChapterButtonLink/FreeChapterButtonLink';

import image_einsten  from '../../../../images/einsten.png';
import history from '../../../../images/Homepage/history.svg';
import maths from '../../../../images/Homepage/mathematics.svg';

import Aos from 'aos';


import { useLottie } from "lottie-react";

import lottieChapitre from '../../../../animation/homepage/lottieChapitre.json';





const FreeChapterSection = () => {

    const options = {
        animationData: lottieChapitre,
        loop: true,
        autoplay: true
    };
    
    const { View } = useLottie(options);

    useEffect(() => {
        Aos.init({
            duration: 2000,
            offset: -50
        })
    } , []);


    return (
        <section className = 'container-fluid free-chapter-section' data-aos= 'fade-up'  data-aos-once= 'false' >
            <div className="container">
            <Title text = 'découvre un chapitre gratuitement' centerOverlined textcentered />
            <div className="row">
                <div className="button-link-container">
                    <div data-aos= 'fade-up' data-aos-delay = '400' data-aos-once= 'true' style = {{ flex: '1' }} data-aos-anchor=".free-chapter-section">
                        <FreeChapterButtonLink 
                            img = {history} />
                    </div>

                    <div data-aos= 'fade-up' data-aos-delay = '800'  data-aos-once= 'true' data-aos-anchor=".free-chapter-section" style = {{ flex: '1' }}>
                        <FreeChapterButtonLink 
                            img = {maths} />
                    </div>
                </div>

                <div className="img-container" data-aos= 'fade' data-aos-delay='1000' data-aos-once='true' data-aos-anchor=".free-chapter-section">
                  {/*   <img 
                    src={image_einsten} alt=""/> */}
                    {View}
                </div>
            </div>
            </div>
        </section>
    )
}

export default FreeChapterSection;
