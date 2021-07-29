import React from 'react';
import './ChapitreComponent.css';

const ChapitreComponent = (props) => {
    return (
       
        <div className="chapitre-container">
            <div className="elements">
                <h5 className="order-chapitre">{props?.chapter}</h5>
                <h4 className="title-chapitre">{props?.title}</h4>
            
                <div className="progression-bars">
                    <div className="ins-progress">
                        <div className = 'bg-green h-100' style = {{ width: `${ props?.progression || '0%' }` }}></div>
                    </div>
                    <span className="pourcentage" > {props?.progression || '0%'} </span>
                </div>
            </div>
        </div>
    )
}

export default ChapitreComponent;
