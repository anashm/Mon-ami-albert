import React , { useEffect } from 'react'
import './Seconddiv.css';
import image_einsten  from '../../../images/groupe_de_masque.png';
import icon_progression  from '../../../images/progression.svg';
import icon_programme  from '../../../images/programme.svg';
import icon_evaluation  from '../../../images/Evaluation.svg';
import icon_challenge  from '../../../images/challenge.svg';

import Title from '../../general/Title/Title';
import HorizontalCard from '../../general/HorizontalCard/HorizontalCard';
import PrimaryLinkButton from '../../general/PrimaryLinkButton/PrimaryLinkButton';
import Propositions from '../../general/Proposistions/Proposistions';

import { Divider } from 'semantic-ui-react';

import AOS from 'aos';



const SchoolInfosSection = ()  => {


    useEffect(() => {
        AOS.init({
            duration: 2000,
            offset: 200

        });
    } , [])

    const propositions = [
        {
            img: icon_programme,
            title: 'un programme motivant',
            text: 'Lorem ipsum dolor sit amet, consetetur sadipscing.'
        },
        {
            img: icon_evaluation,
            title: 'évaluation continue',
            text: 'Lorem ipsum dolor sit amet, consetetur sadipscing.'
        },
        {
            img: icon_progression,
            title: 'suivi de progression',
            text: 'Lorem ipsum dolor sit amet, consetetur sadipscing.'
        },
        {
            img: icon_challenge,
            title: 'challenge quotidien',
            text: 'Lorem ipsum dolor sit amet, consetetur sadipscing.'
        }
    ]
    
    return (
        <section className="container-fluid school-infos-Section" data-aos="fade-up" data-aos-once="false" >
            <div className="container">
                <div className="row">
                    <div className="description-container">
                        <div>
                            <Title 
                            animation = 'fade'
                            delay = {100}
                            once = 'true'
                            text = "Qu'est-ce que je propose ?" leftOverlined data-aos="fade-up" data-aos-once="true"  />
                        </div>
                        <Divider hidden/>
                        <HorizontalCard
                        animation = 'fade'
                        delay = {200}
                        once = 'true'
                        img = {image_einsten} 
                        text = 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam' />
                        <Divider hidden/>
                        <PrimaryLinkButton 
                            animation = 'fade'
                            delay = {300}
                            once = 'true'
                            text = 'découvrez mon ami albert'
                            link = '/'
                        />
                    </div>

                    <Propositions propositions = { propositions } />
                </div>
            </div>
        </section>
    )
}

export default SchoolInfosSection;