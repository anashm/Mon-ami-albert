import React , { useContext } from 'react';

import { Link } from 'react-router-dom'
import { Icon } from 'semantic-ui-react';
import { useHistory } from "react-router-dom";

import UserContext from '../../../Context/UserContext/UserContext';


const FooterMenu = () => {

    const history = useHistory();
    const userContext = useContext(UserContext);


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
            link: '/dashboard-user'
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
            link: '/test_qr_code'

        },

    ]



    return (
        <footer className = {`footer-menu  ${(userContext.current_location === '/' &&  window.innerWidth <= 500) ? 'd-none' : ''}`}>
            
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
