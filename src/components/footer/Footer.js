import React from 'react';
import './Footer.css';
import facebook_icon from '../../images/facebook-icon.svg';
import instagram_icon from '../../images/instagram-icon.svg';
import twitter_icon from '../../images/twitter-icon.svg';

import FooterIcon from './Icons/FooterIcon';
import FooterLink from './FooterLink/FooterLink';

const  Footer = () => {


    const footerLinks = [
        { 
            title: 'qUI SUIS-JE ?',
            link : '#'
        },
        { 
            title: 'méthodologie',
            link : '#'
        },
        { 
            title: 'contact',
            link : '#'
        },
        { 
            title: 'aide',
            link : '#'
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
                        { footerLinks.map(footerLink => <FooterLink link = { footerLink.link } text = { footerLink.title } />) }
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
