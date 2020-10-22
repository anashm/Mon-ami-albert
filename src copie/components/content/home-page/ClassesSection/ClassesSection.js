import React from 'react';
import Classes from './Classes/Classes';
import Title from '../../../general/Title/Title';

const ClassesSection = () => {
   


    const classes = {
        title: 'classes',
        names: [
            'ECS 1 -ECE 1- ECT1', 'ECS2 - ECE 2 - ECT2' , 'Maths sup' , 'Maths spe', 'Terminale S' , 'Terminale ES ' , 'Terminale L' , 'Première S' , 'Première ES' , 'Première L' , 'Seconde'
        ]
    }

    const courses = {
        title: 'matières',
        names : ['Mathématiques' , 'Français' ,  'Histoire' , 'Géographie' , 'Physique-Chimie' , 'SVT', 'SES' , 'Anglais' ,  'Espagnol', 'Sciences' , 'Philosophie', 'Littérature']
    }

    const helpers = {
        title: 'aides',
        names: [ 'Soutien scolaire'  , 'Cours particuliers', 'Comment bien réussir sa rentrée des classes'],
    }

    const ressources = {
        title: 'ressources',
        names: ['Ressources' , 'Fiches de révisions' , 'Quiz' , 'Exercices']
    }

    const helpers_subinfos = [
        {
            title: 'Réformes 2019 – 2021',
            texts: [ 'Réforme du lycée 2019' ]
        },
        {
            title: 'Partenaires',
            texts: []
        }
    ];

    const ressorces_subInfos = [
        {
            title: 'cycle',
            texts: [ 'Lycée' , 'Supérieur' ]
        }
    ];



    return (
        <section className = 'container-fluid classes-section'>

            <div className="container">
                <Title text = 'voir aussi +' centerOverlined textcentered />
                <div className="row">
                    <Classes infos = { classes } />

                    <Classes infos = { courses } />

                    <Classes infos = { helpers } subInfos = { helpers_subinfos }  />

                    <Classes infos = { ressources } subInfos = { ressorces_subInfos }  />
                </div>
            </div>
            
        </section>
    );
}

export default ClassesSection;
