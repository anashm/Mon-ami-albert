import React from 'react'
import image_einsten  from '../../../images/Homepage/kisspng-albert-einstein-memorial-clip-art-5b07ab80453650.4731745515272293122835.png';
import './Thirddiv.css';
import  Reasons from './Reasons/Reasons';
import Title from '../../general/Title/Title'


const Thirddiv = () => {

    const reasons = [
        'Soutien scolaire pour toute les classes',
        'Cours et exercices dans toutes les matières',
        'Cours et exercices dans toutes les matières',
        'des Professeurs en ligne et par chat',
        'Assistance parents par téléphone',
        'Service personnalisé sur la moyenne'
    ]



    return (
        <section className="container-fluid school-choice-reason-section">
            <Title text = 'pourquoi me choisir ?' textcentered centerOverlined />
        

            <div className="container">
                <div className="row">
                    <Reasons reasons = {reasons} />
                    <div className="school-choice-image-container">
                        <img src={image_einsten} alt=""/>
                    </div>
                    <Reasons reasons = {reasons} />
                </div>
            </div>
        </section>
    )
}

export default Thirddiv;
