import React from 'react'
import './Seventhdiv.css';
import image_phones from '../../../images/phones.jpg';
import image_play_store from '../../../images/btn_playstore.jpg';
import image_app_store from '../../../images/btn_appstore.jpg';

export default function Seventhdiv() {
    return (
        <div  style={{marginTop:'20px'}}>
            <div  style={{padding:'100px'}}>
                <div className="row">
                    <div className="col-md-1"></div>
                    <div className="col-md-5">
                        <span className="title_second_div" style={{fontSize:'30px'}} > <hr className="hr_div"></hr>TELECHARGER NOTRE APPLICATION</span>
                        <br></br><br></br>
                        
                           
                            
                            <p className="text_div">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam</p>
                       
                        <br></br><br></br><br></br>
                        
                            <img src={image_play_store} width="30%" />
                            <img src={image_app_store} width="30%" style={{marginLeft:'20px'}} />
                        
                    </div>

                    <div className="col-md-1"></div>  

                    <div className="col-md-5">
                        <img src={image_phones} width="70%" />
                    </div>
                </div>
            </div>
        </div>
    )
}
