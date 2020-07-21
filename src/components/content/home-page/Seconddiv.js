import React from 'react'
import './Seconddiv.css';
import image_einsten  from '../../../images/groupe_de_masque.png';
import icon_progression  from '../../../images/progression.svg';
import icon_programme  from '../../../images/programme.svg';
import icon_evaluation  from '../../../images/Evaluation.svg';
import icon_challenge  from '../../../images/challenge.svg';


export default function Seconddiv() {
    
    return (
        <div  style={{background:'#FAFAFA',marginTop:'50px'}}>
            <div  style={{padding:'100px'}}>
                <div className="row">
                    <div className="col-md-5">
                        <span className="title_second_div" style={{fontSize:'30px'}} > <hr className="hr_div"></hr>QU'EST-CE QUE JE PROPOSE ?</span>
                        <br></br><br></br>
                        <div >
                            <div style={{float:"left"}}> <img src={image_einsten} style={{width : '70%'}} /> </div>
                            
                            <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam</p>
                        </div> 
                        <br></br><br></br><br></br>
                        <button style={{borderRadius:'30px',paddingBottom:'10px',paddingTop:'10px',paddingLeft:'30px',paddingRight:'30px'}}  className="btn btn-secondary decouvrir">DECOUVRIR MON AMI ALBERT</button>
                    </div>
                    <div className="col-md-1"></div>  
                    <div className="col-md-6">
                        <div className="row">
                            <div className="col-md-6">
                                <img src={icon_programme} style={{width:'20%'}} />
                                <br></br><br></br>
                                <span className="title_quatre_icons">UN PROGRAMME MOTIVANT</span>
                                <p style={{fontSize:'12px'}}>Lorem ipsum dolor sit amet, consetetur sadipscing.</p>   
                            </div>

                            <div className="col-md-6">
                                <img src={icon_evaluation} style={{width:'20%'}} />
                                <br></br><br></br>
                                <span className="title_quatre_icons">EVALUATION CONTINUE</span>
                                <p style={{fontSize:'12px'}}>Lorem ipsum dolor sit amet, consetetur sadipscing.</p>  
                            </div>
                            <div className="w-100" style={{marginTop:'30px'}}></div>

                            <div className="col-md-6">
                                <img src={icon_progression} style={{width:'20%'}} />
                                <br></br><br></br>
                                <span className="title_quatre_icons">SUIVI DE PROGRESSION</span>
                                <p style={{fontSize:'12px'}}>Lorem ipsum dolor sit amet, consetetur sadipscing.</p>  
                            </div>

                            <div className="col-md-6">
                                <img src={icon_challenge} style={{width:'23%'}} />
                                <br></br><br></br>
                                <span className="title_quatre_icons">CHALLENGE QUOTIDIEN</span>
                                <p style={{fontSize:'12px'}}>Lorem ipsum dolor sit amet, consetetur sadipscing.</p>  
                            </div>
                        </div>
                        
                    </div>
                </div>               
                
            </div>
        </div>
    )
}
