import React from 'react';

const FooterIcon = ({ img , link }) => {
    return (
        // eslint-disable-next-line react/jsx-no-target-blank
        <a href = { link } className = 'footer-icon-link' target = '_blank' rel = 'noopener'> 
            <img src={ img } alt=""/>
        </a>
    )
}

export default FooterIcon;
