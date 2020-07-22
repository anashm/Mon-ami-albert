import React from 'react';
import './Footer.css';
import facebook_icon from '../../images/facebook-icon.svg';
import instagram_icon from '../../images/instagram-icon.svg';
import twitter_icon from '../../images/twitter-icon.svg';

export default function Footer() {
    return (
       
            <div style={{background:'#636363'}} className="footer_container">
            
                    <div className="items_container"> 
                        <center>
                            <span className="items_footer">QUI SUIS JE?</span>
                            <span className="items_footer">PARENT</span>
                            <span className="items_footer">ENSEIGNANT   </span>
                            <span className="items_footer">METHODOLOGIE</span>
                            <span className="items_footer">CONTACT</span>                  
                            <span className="items_footer">AIDE</span>                
                            <span className="items_footer">MENTION LEGALES</span>
                    </center>
                </div>  

                <div className="social-icons">
                    <center>
                        <img className="icons" src={facebook_icon} /> 
                        <img className="icons" src={instagram_icon} /> 
                        <img className="icons" src={twitter_icon} /> 
                    </center>
                    
                </div>

                <div className="copyright">
                        <center>©&nbsp;&nbsp;&nbsp;mon ami albert 2020</center>
                </div>
                
            </div>
       
    )
}
