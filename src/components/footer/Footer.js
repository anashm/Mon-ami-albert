import React , { Fragment } from 'react';
import './Footer.css';
import facebook_icon from '../../images/facebook-icon.svg';
import instagram_icon from '../../images/instagram-icon.svg';
import twitter_icon from '../../images/twitter-icon.svg';

import FooterIcon from './Icons/FooterIcon';
import FooterLink from './FooterLink/FooterLink';

const  Footer = () => {

    const whoami = (
        <Fragment>
            <img src= { twitter_icon } alt=""/>
            <p>Mon ami albert</p>
        </Fragment>
    );

    const help = (
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

    const contact = (
        <Fragment>
            <h3 >Besoin de plus de renseignement ? toutes nos &eacute;quipes sont mobilis&eacute;s pour vous aider et vous conseiller.</h3>
            <p>Vous pouvez les contacter par t&eacute;l&eacute;phone au <strong>09 70 70 22 32</strong></p>
            <p>Ou par mail : <a href="mailto:contact@cours-des-grands.fr" target="_blank" rel="noopener noreferrer">contact@cours-des-grands.fr</a></p>
        </Fragment>
    );

    const methodologie = (
        <Fragment>
            <p >Vous avez des questions ? N&rsquo;h&eacute;sitez pas &agrave; consulter notre FAQ</p>
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
    )


    const footerLinks = [
        { 
            title: 'qUI SUIS-JE ?',
            link : '#',
            jsx: whoami
        },
        { 
            title: 'méthodologie',
            link : '#',
            jsx: methodologie
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

    const footerIcons = [
        {
            img: facebook_icon,
            link: '#'
        },
        {
            img: instagram_icon,
            link: '#'
        },
        {
            img: twitter_icon,
            link: '#'
        }
    ];

    return (
        <footer className="container-fluid main-footer">
            <div className="container">
                <div className="row">
                    <div className="footer-link-container">
                        { footerLinks.map(footerLink => <FooterLink link = { footerLink.link } text = { footerLink.title }  jsx = {footerLink.jsx} />) }
                    </div>
                </div>
                <div className="row">
                    <div className="social-icons-container">
                        { footerIcons.map(footerIcon =>  <FooterIcon link = {footerIcon.link} img = {footerIcon.img}  /> ) }
                    </div>
                </div>
                <div className="row">
                    <p className="rights-text">mon ami albert 2020</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer;
