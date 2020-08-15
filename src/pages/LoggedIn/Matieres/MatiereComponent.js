import React from 'react';
import './MatiereComponent.css';


const MatiereComponent = (props) => {
    
    return (
        <div className="matiere-container">
           

            <div className="image_container">
                <img src={props.logo}   />
            </div>
           
            <div className="details-matieres">
                <br></br>
                <p className="title-matiere">{props.title}</p>
                <div className="progression-bar">
                    <div className="in-progress"></div>
                </div>
                <span className="pourcentage" style={{float:'left',marginLeft:'1%'}}>0%</span>
            </div>
          

        </div>
    )
}


export default MatiereComponent