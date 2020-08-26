import React from 'react';
import { Link } from 'react-router-dom'

const PrimaryLinkButton = ({ text , link , animation , delay , once  }) => (
    <Link 
        to = {link} 
        data-aos= {animation} data-aos-delay={delay} data-aos-once={once}
        className = 'primary-link-button'> 
        { text } 
    </Link>
)

export default PrimaryLinkButton;
