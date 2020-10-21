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
        });
    } , [])

    const propositions = [
        {
            img: icon_programme,
            title: 'Un programme complet ',
            text: 'Conforme au nouveau programme et aux nouvelles réformes'
        },
        {
            img: icon_evaluation,
            title: 'Des exemples d’évaluations',
            text: 'Des évaluations fréquentes, pour valider les acquis à la fin de chaque chapitre.'
        },
        {
            img: icon_progression,
            title: 'Un système de points et de récompenses :',
            text: 'Les étudiants gagnent des points à hauteur de leurs efforts'
        },
        {
            img: icon_challenge,
            title: 'Des résultats concrets et approuvés',
            text: 'Nos étudiants gagnent jusqu’à 4.2 points sur leur moyenne générale.'
        }
    ];

    const text = `Le contenu proposés par Mon ami Albert est conçu pour permettre à l’étudiant d’apprendre tout en étant stimulé. Pour cela, nous avons développés une approche positive au cœur de notre plateforme. 
    Un suivi pour le lycée et les classes prépa, des exercices corrigés, des jeux/Quizz et un classement pour vous challenger ! Ça plait aux étudiants, ça les motives et ça les rend autonomes`;
    
    return (
        <section className="container-fluid school-infos-Section" data-aos="fade-up" data-aos-once="false" >
            <div className="container">
                <div className="row">
                    <div className="description-container">
                        <div>
                            <Title 
                            animation = 'fade'
                            once = 'true'
                            text = "Qu'est-ce que je propose ?" leftOverlined data-aos="fade-up" data-aos-once="true"  />
                        </div>
                        <Divider hidden/>
                        <HorizontalCard
                        animation = 'fade'
                        delay = {100}
                        once = 'true'
                        img = {image_einsten} 
                        text = {text}>
                            <div>Le contenu proposé par Mon ami Albert est conçu pour permettre à l’étudiant d’apprendre tout en étant stimulé. Pour cela, nous avons développés une approche positive au cœur de notre plateforme. </div>
                            <div>Un suivi pour le lycée et les classes préparatoire, des exercices corrigés, des jeux/Quizz et un classement pour vous challenger ! Ça plait aux étudiants, ça les motives et ça les rend autonomes.</div>
                        </HorizontalCard>
                        <Divider hidden/>
                        <PrimaryLinkButton 
                            animation = 'fade'
                            delay = {200}
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