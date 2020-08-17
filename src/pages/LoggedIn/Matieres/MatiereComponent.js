import React from 'react';
import './MatiereComponent.css';


const MatiereComponent = (props) => {
    
    return (
        <div className="matiere-container">
            <div className="image_container">
                <img src={props.logo} alt = ""   />
            </div>
           
            <div className="details-matieres">
                <p className="title-matiere">{props.title}</p>
                <div className="progression-bar">
                    <div className="in-progress"></div>
                    <span className="pourcentage" >0%</span>
                </div>
            </div>
        </div>
    )
}


export default MatiereComponent