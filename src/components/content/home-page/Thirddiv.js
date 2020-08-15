import React from 'react'
import image_einsten  from '../../../images/Homepage/kisspng-albert-einstein-memorial-clip-art-5b07ab80453650.4731745515272293122835.png';
import './Thirddiv.css';
import  Reasons from './Reasons/Reasons';
import Title from '../../general/Title/Title'


const Thirddiv = () => {

    const reasonsLeft = [
        {
            index: 1,
            text: 'Soutien scolaire pour toute les classes'
        },

        {
            index: 2,
            text:  'Cours et exercices dans toutes les matières',
        },

        {
            index: 3,
            text:   'Cours et exercices dans toutes les matières',
        }
    ];

    const reasonsRight = [
        {
            index: 4,
            text: 'Soutien scolaire pour toute les classes'
        },

        {
            index: 5,
            text:  'Cours et exercices dans toutes les matières',
        },

        {
            index: 6,
            text:   'Cours et exercices dans toutes les matières',
        }
    ];


    return (
        <section className="container-fluid school-choice-reason-section">
            <Title text = 'pourquoi me choisir ?' textcentered centerOverlined />
        

            <div className="container">
                <div className="row">
                    <Reasons reasons = {reasonsLeft} left />
                    <div className="school-choice-image-container">
                        <img src={image_einsten} alt=""/>
                    </div>
                    <Reasons reasons = {reasonsRight} right />
                </div>
            </div>
        </section>
    )
}

export default Thirddiv;
