import React from 'react';
import {Icon} from 'semantic-ui-react';
import './DownloadButton.scss';

const DownloadButton = () => {
    return (
        <div className = 'download-btn-container'>
            <a href="#" className = 'download-btn' download>
                <Icon name='file pdf'/>
                télécharger la version pdf 
            </a>
        </div>
    )
}

export default DownloadButton
