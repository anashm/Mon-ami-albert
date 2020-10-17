import React , { Fragment } from 'react';

import { Link } from 'react-router-dom'
import { Icon } from 'semantic-ui-react';
import { useHistory } from "react-router-dom";


const FooterMenu = () => {

    const history = useHistory();


    const mobileFooter = [
        {
            text: 'Retour',
            icon: 'angle left',
            hasLink: false
        },

        {
            text: 'Parcours',
            icon: 'graduation',
            hasLink: true,
            link: '/classement-general'
        },

        {
            text: 'Compte',
            icon: 'user',
            hasLink: true,
            link: '/profil'
        },

        {
            text: 'Qrcode',
            icon: 'qrcode',
            hasLink: true,
            link: '/profil'
        },

    ]



    return (
        <footer className = 'footer-menu'>
            
            {
                mobileFooter.map(footer => {
                    if(footer.hasLink){
                        return(
                            <div key = {footer.icon} className="footer-block">
                                <Link to = { footer.link } >
                                    <Icon name = { footer.icon } /> { footer.text }  
                                </Link>
                            </div>
                        )  
                    }else{
                        return(
                            <div  key = {footer.icon}  className="footer-block">
                                <button type = 'button' onClick = { () => history.goBack() }> 
                                    <Icon name = { footer.icon } /> { footer.text }  
                                </button>
                            </div>
                        )
                       
                    }
                })
            }

            
        </footer>
    )
}

export default FooterMenu;
