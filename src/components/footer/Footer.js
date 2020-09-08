import React from 'react';
import './Footer.css';
import facebook_icon from '../../images/facebook-icon.svg';
import instagram_icon from '../../images/instagram-icon.svg';
import twitter_icon from '../../images/twitter-icon.svg';

import FooterIcon from './Icons/FooterIcon';
import FooterLink from './FooterLink/FooterLink';


import {
    footerLinks
} from './FooterText';

const  Footer = () => {

    const convertToSlug = str  => {
	
        //replace all special characters | symbols with a space
        str = str.replace(/[`~!@#$%^&*()_\-+=\[\]{};:'"\\|\/,.<>?\s]/g, ' ').toLowerCase();
        // trim spaces at start and end of string
        str = str.replace(/^\s+|\s+$/gm,'');
        // replace space with dash/hyphen
        str = str.replace(/\s+/g, '-');	
        return str;
    }



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
                        { footerLinks.map(footerLink => <FooterLink key = {footerLink.title } link = { footerLink.link } id = { `hamburger-${convertToSlug(footerLink.title)}` } text = { footerLink.title }  jsx = {footerLink.jsx} />) }
                    </div>
                </div>
                <div className="row">
                    <div className="social-icons-container">
                        { footerIcons.map(footerIcon =>  <FooterIcon key = {footerIcon.img} link = {footerIcon.link} img = {footerIcon.img}  /> ) }
                    </div>
                </div>
                <div className="row">
                    <p className="rights-text"> &copy; mon ami albert 2020</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer;
