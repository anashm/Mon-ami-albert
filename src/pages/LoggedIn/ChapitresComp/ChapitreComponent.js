import React from 'react';
import './ChapitreComponent.css';

const ChapitreComponent = (props) => {
    return (
       
        <div className="chapitre-container">
            <div className="elements">
                <h5 className="order-chapitre">Chapitre {props.ordre}</h5>
                <h4 className="title-chapitre">{props.title}</h4>
            
                <div className="progression-bars">
                    <div className="ins-progress">
                        <div></div>
                    </div>
                    <span className="pourcentage" >0%</span>
                </div>
            </div>
        </div>
    )
}

export default ChapitreComponent;
