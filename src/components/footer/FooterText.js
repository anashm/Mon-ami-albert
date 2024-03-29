import React , { Fragment } from 'react';
import QRComponent from '../../pages/QRCode/QRComponent';

import img from './Albert.png';


export const whoami = (
    <Fragment>
        <p>
            Mon ami Albert est un site et une application d’accompagnement scolaire qui accompagne les élèves du lycée et des classes préparatoires à combler leurs lacunes. La plateforme s’investit au quotidien pour les aider à progresser dans leur apprentissage et leur garantir de très bons résultats. <br /><br />
            En assurant la correction automatique et en proposant plus de 4000 exercices, Mon Ami Albert t'accompagnes dans votre quête de la réussite.
        </p>
    </Fragment>
);

export const ourValues = (
    <Fragment>


        <h3 > La culture Mon Ami Albert est basée sur 3 valeurs fondamentales qui constituent sa référence ultime :</h3>
        <ul>
            <li> Epanouissement </li>
            <li> Partage</li>
            <li> Modernité </li>
        </ul>

        <h3>Nos visions :</h3>

        <p>Apprendre, s’entraîner, s’évaluer, se challenger, c’est ce que nous proposons pour que les étudiants aient des résultats concrets et approuvé pour gagner plus de 3.5 points sur leurs moyennes générales.</p>

    </Fragment>
)

export const ourMissions = (
    <Fragment>
        <h3 > Mon Ami Albert est né d’une envie : rendre l’éducation accessible à tous avec une double exigence :</h3>
        <ul>
            <li> Concevoir des ressources pédagogiques de qualité </li>
            <li> Créer une plateforme numérique moderne intuitive permettant de faire progresser l’étudiant en assurant des corrections automatiques et en proposant plus de 4000 exercices.</li>
        </ul>
    </Fragment>
)

export const methodologie = (
    <Fragment>
        <h3>Mon Ami Albert est n&eacute; d&rsquo;une envie : rendre l&rsquo;&eacute;ducation accessible &agrave; tous avec une double exigence :</h3>
            <ul>
            <li>Concevoir des ressources p&eacute;dagogiques de qualit&eacute;</li>
            <li>Cr&eacute;er une plateforme num&eacute;rique moderne intuitif permettant de faire progresser l&rsquo;&eacute;tudiant en assurant des corrections automatiques et en proposant plus de 4000 exercices.</li>
            </ul>
            <p>Cette plateforme, aide les &eacute;l&egrave;ves &agrave; progresser dans leur apprentissage et &agrave; tirer le maximum de leur potentiel. Elle permet aux &eacute;l&egrave;ves de travailler en autonomie et &agrave; leur rythme : ils s&rsquo;entrainent sur le site, font leurs devoirs et d&eacute;passent leurs difficult&eacute;s.</p>
            <p>Tous nos contenus sont r&eacute;dig&eacute;s par des professionnels de l&rsquo;&eacute;ducation et sont conforme au nouveau programme et aux nouvelles r&eacute;formes.</p>
            <p>Apprendre, s&rsquo;entra&icirc;ner, s&rsquo;&eacute;valuer, se challenger, c&rsquo;est ce que nous proposons pour que les &eacute;tudiants aient des r&eacute;sultats concrets et approuv&eacute; et gagner plus de 3.5 points sur leurs moyennes g&eacute;n&eacute;rales.</p>
    </Fragment>
);

export const contact = (
    <Fragment>
        <h3 >Besoin de plus de renseignement ? toutes nos &eacute;quipes sont mobilis&eacute;s pour t'aider et te conseiller.</h3>
        <p>Tu peux les contacter par t&eacute;l&eacute;phone au <strong>09 70 70 22 32</strong></p>
        <p>Ou par mail : <a href="mailto:contact@cours-des-grands.fr" target="_blank" rel="noopener noreferrer">contact@cours-des-grands.fr</a></p>
    </Fragment>
);

export const help = (
    <Fragment>
        <p >Tu as des questions ? N&rsquo;h&eacute;sitez pas &agrave; consulter notre FAQ</p>
        <h3>Mention l&eacute;gal :</h3>
        <h4>Mon Ami Albert est &eacute;dit&eacute; par :</h4>
        <ul>
        <li>eDukaty ,&nbsp;70 rue Mademoiselle ,&nbsp;75015 Paris ,&nbsp;France</li>
        </ul>
        <h4>Dont le si&egrave;ge social se situe au :</h4>
        <ul>
        <li>Cours des Grands ,&nbsp;77 avenue Parmentier,&nbsp;75011 Paris ,&nbsp;France</li>
        </ul>
        <h4>Directeur de publication :</h4>
        <ul>
        <li>Othmane Akherraz</li>
        </ul>
        <h4>Contact &amp; service clients</h4>
        <ul>
        <li>Mail: contact@cours-des-grands.fr</li>
        <li>Tel : +33 9 70 70 22 32</li>
        </ul>
    </Fragment>
);

export const footerLinks = [
    { 
        title: 'Qui sommes-nous  ?',
        link : '#',
        jsx: whoami
    },
    { 
        title: 'Nos valeurs',
        link : '#',
        jsx: ourValues
    },
    { 
        title: 'méthodologie',
        link : '#',
        jsx: methodologie
    },
    { 
        title: 'Nos Visions',
        link : '#',
        jsx: ourMissions
    },
    { 
        title: 'contact',
        link : '#',
        jsx: contact
    },
    { 
        title: 'aide',
        link : '#',
        jsx: help
    }
    
];