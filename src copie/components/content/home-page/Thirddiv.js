import React , { useEffect } from 'react'
import image_einsten  from '../../../images/Homepage/kisspng-albert-einstein-memorial-clip-art-5b07ab80453650.4731745515272293122835.png';
import './Thirddiv.css';
import  Reasons from './Reasons/Reasons';
import Title from '../../general/Title/Title';
import AOS from 'aos';

import { useLottie } from "lottie-react";

import lottieChoice from '../../../animation/homepage/lottieChoice.json';


const Thirddiv = () => {

    const options = {
        animationData: lottieChoice,
        loop: true,
        autoplay: true
    };
    
    const { View } = useLottie(options);

    useEffect(() => {
        AOS.init({
            duration: 1000,
            offset: -120
        });
    }, []);

    const reasonsLeft = [
        {
            index: 1,
            text: 'Des ressources pédagogiques de qualité'
        },

        {
            index: 2,
            text:  'Des cours et des exercices dans toutes les matières',
        },

        {
            index: 3,
            text:   'Des quizz, des exemples de contrôles et des anales',
        }
    ];

    const reasonsRight = [
        {
            index: 4,
            text: 'Des étudiants satisfaits'
        },

        {
            index: 5,
            text:  'Des résultats concrets et approuvés',
        },

        {
            index: 6,
            text:   'Des récompenses pour les plus appliqués',
        }
    ];


    return (
        <section className="container-fluid school-choice-reason-section" data-aos="fade-up">
            <div data-aos="fade-down" >
                <Title text = 'pourquoi me choisir ?' textcentered centerOverlined />
            </div>
        
            <div className="container">
                <div className="row">
                    <Reasons reasons = {reasonsLeft}  />

                    <div className="school-choice-image-container" data-aos="fade" data-aos-once="true">
                       {/*  <img src={image_einsten} alt=""/> */}
                       {View}
                    </div>

                    <Reasons reasons = {reasonsRight} right />
                </div>
            </div>
        </section>
    )
}

export default Thirddiv;
