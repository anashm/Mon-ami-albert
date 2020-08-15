import React,{useEffect} from 'react';
import './JeSuisUnComponent.css';
import avatar from '../../../images/adulte_avatar.png';
import { Link } from 'react-router-dom';
import Google from '../../../pages/Login/Social/Google/Google';
import Facebook from '../../../pages/Login/Social/Facebook/Facebook';
import Title from '../../general/Title/Title';

const JesuisUnComponent = (props) => {
    
    /* useEffect( () => {
        console.log("received "+props.location.state.hello);
        
      },[]) */
    
        return (
            <div className="container mt-20-percent">

                <Title text = 'CREEZ VOTRE COMPTE' textcentered centerOverlined  />

                <div className="row" style={{marginTop:'-2%'}}>
                    <div className="col-md-4"></div>

                    <div className="col-md-4" style={{marginLeft:'4%'}}>
                        <div style={{float:"left",width:'20%'}}>
                             <img src={avatar} style={{width : '70%'}} /> 
                        </div>
                        
                        <p className="text-avatar"> Je suis un <b> {props.location.state.fonction}</b>.&nbsp;&nbsp;
                        <Link to="/creat-account"> Modifier </Link></p>
                    </div>
                </div>
                <br></br><br></br><br></br>

                <div className="social-login-container">
                    <div className="google-login-btn-container">
                        <Google />
                    </div>

                    {/* <div className="facebook-login-btn-container">
                        <Facebook/>
                    </div> */}
                </div>
                    
                <p className="deja_un_compte">Vous avez déjà un compte ? <Link to="/login"> Connecte-toi </Link></p>
            </div>
        )
    
    
}

export default JesuisUnComponent ;
