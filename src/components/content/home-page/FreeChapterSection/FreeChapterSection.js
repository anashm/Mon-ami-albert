import React from 'react';
import Title from '../../../general/Title/Title';
import FreeChapterButtonLink from './FreeChapterButtonLink/FreeChapterButtonLink';

import image_einsten  from '../../../../images/einsten.png';
import history from '../../../../images/Homepage/history.svg';
import maths from '../../../../images/Homepage/mathematics.svg';



const FreeChapterSection = () => {
    return (
        <section className = 'container-fluid free-chapter-section'>
            <div className="container">
            <Title text = 'découvre un chapitre gratuitement' centerOverlined textcentered />
            <div className="row">
                <div className="button-link-container">
                    <FreeChapterButtonLink img = {history} />
                    <FreeChapterButtonLink img = { maths } />
                </div>

                <div className="img-container">
                    <img src={image_einsten} alt=""/>
                </div>
            </div>
            </div>
        </section>
    )
}

export default FreeChapterSection;
