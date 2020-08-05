import React from 'react';
import './MatiereComponent.css';


const MatiereComponent = (props) => {
    
    return (
        <div className="matiere-container">
            {/* <div className="row">
                <div className="col-md-1">
                   <div>
                         <img src={props.logo}   />
                    </div> 
                </div>
                <div className="col-md-6" style={{marginLeft:'2%',marginTop:'2%'}}>
                    <div className="details-matieres">
                    <p className="title-matiere">{props.title}</p>
                    <div className="progression-bar">
                        <div className="in-progress"></div>
                    </div>
                    <span className="pourcentage" style={{float:'left',marginLeft:'1%'}}>0%</span>
                    </div>
                </div>
                <div className="col-md-5"></div>
            </div> */}

            <div style={{float:'left'}}>
                <img src={props.logo}   />
            </div>
            
            <div  style={{marginLeft:'2%',marginTop:'2%'}}>
                    <div className="details-matieres">
                        <br></br>
                        <p className="title-matiere">{props.title}</p>
                        <div className="progression-bar">
                            <div className="in-progress"></div>
                        </div>
                        <span className="pourcentage" style={{float:'left',marginLeft:'1%'}}>0%</span>
                    </div>
            </div>

        </div>
    )
}


export default MatiereComponent