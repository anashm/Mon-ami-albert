import React from 'react';
import { Link } from 'react-router-dom';

const DownloadButton = ({ title ,  subTitle , img , src }) => {

    if(src === '/'){
        return <Link to={src} className = 'download-btn-link cursor-not-allowed' >
            <div className="img">
                <img src={img} alt=""/>
            </div>

            <div className="text">
                <span className="title">{ title }</span>
                <span className="subtitle"> { subTitle } </span>
            </div>
        </Link>
    }else{
       return <a href={src} className = 'download-btn-link' target = {`${ src !== "/" ? '_blank' : '' }`} rel = {`${ src !== "/" ? 'noopener noreferrer' : '' }`}>
            <div className="img">
                <img src={img} alt=""/>
            </div>

            <div className="text">
                <span className="title">{ title }</span>
                <span className="subtitle"> { subTitle } </span>
            </div>
        </a>
    }
    
}

export default DownloadButton;
