import React , { Fragment } from 'react';

import { Link } from 'react-router-dom'
import { Icon } from 'semantic-ui-react';
import { useHistory } from "react-router-dom";


const FooterMenu = () => {

    const history = useHistory();


    const mobileFooter = [
        {
            text: 'Retour',
            icon: 'arrow left',
            hasLink: false
        },

        {
            text: 'Classement',
            icon: 'boxes',
            hasLink: true,
            link: '/classement-general'
        },

        {
            text: 'Compte',
            icon: 'user',
            hasLink: true,
            link: '/profilPage'
        },

    ]



    return (
        <footer className = 'footer-menu'>
            
            {
                mobileFooter.map(footer => {
                    if(footer.hasLink){
                        return(
                            <div className="footer-block">
                                <Link to = { footer.link } >
                                    <Icon name = { footer.icon } /> { footer.text }  
                                </Link>
                            </div>
                        )  
                    }else{
                        return(
                            <div className="footer-block">
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
