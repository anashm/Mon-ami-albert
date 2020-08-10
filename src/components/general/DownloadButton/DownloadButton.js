import React from 'react';

const DownloadButton = ({ title ,  subTitle , img }) => {
    return (
        <a href="#" className = 'download-btn-link'>
            <div className="img">
                <img src={img} alt=""/>
            </div>

            <div className="text">
                <span className="title">{ title }</span>
                <span className="subtitle"> { subTitle } </span>
            </div>
        </a>
    )
}

export default DownloadButton;
