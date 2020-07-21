import React from 'react';
import './Fifthdiv.css';
import image_einsten  from '../../../images/einsten.png';
import image_histoire  from '../../../images/histoire.png';
import image_math  from '../../../images/math.png';

export default function Fifthdiv() {
    return (
        <div className="container"  style={{marginTop:'30px'}}>
            <br></br><br></br>
            <h5 className="title_page"><center><hr className="hr"></hr> DECOUVRE UN CHAPITRE GRATUITEMENT </center></h5>
            <div className="row">
                    <div className="col-md-1"></div>    
                    <div className="first_image">
                        <img src={image_histoire}  style={{width:'100%'}} />
                    
                    </div>
                    <div className="first_image">
                        <img src={image_math}  style={{width:'100%'}} />
                    </div>
                    <div className="col-md-2"></div>
                {/* <div className="col-md-4">
                    <img src={image_math} width="60%" style={{marginTop:'25%'}} />
                </div> */}
                <div className="col-md-4">
                     <img src={image_einsten}  width="70%"/> 
                </div>
                
            </div>
         </div>
    )
}
