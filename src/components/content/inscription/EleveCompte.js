import React,{useState} from 'react';
import './EleveCompte.css';
import {Link} from 'react-router-dom';
import Google from '../../../pages/Login/Social/Google/Google';
import Facebook from '../../../pages/Login/Social/Facebook/Facebook';
import avatar from '../../../images/avatar.png';
import { Button} from 'semantic-ui-react';

export default function EleveCompte() {
    const[changeText , setChangeText] = useState('');
    const[changeColor , setChangeColor] = useState(false);

    const changeNiveau = (niveau) => {
        
        setChangeText(niveau);
        setChangeColor(true);
    }
  
    return (
        
        <div className="container">
            <p  className="cree_ton_compte"><center>  CREE TON COMPTE </center></p>

            <div className="row" style={{marginTop:'-2%'}}>
                    <div className="col-md-4"></div>

                    <div className="col-md-4" style={{marginLeft:'4%'}}>
                        <div style={{float:"left",width:'20%'}}>
                             <img src={avatar} style={{width : '70%'}} /> 
                        </div>
                        
                        <p className="text-avatar"> Je suis un élève de <b>{changeText}</b>&nbsp;&nbsp;
                        <Link to="/creat-account"> Modifier </Link></p>
                    </div>
            </div>

            <p className="quel_classe">En quelle classe es-tu (2019-2020) ?</p>


            <div className="row" style={{marginTop:'60px'}}>
                <div className="col-md-3"></div>
                
                <div className="col-md-7">
                    <div className="grid1">
                        <span className = {`niveaux ${changeColor ? "niveaux_clicked" : ""}`} onClick={() => changeNiveau('CE1')} >CE1&nbsp;</span>
                        <div className="spacers"></div>
                        <span className="niveaux"  onClick={() => changeNiveau('CE2')} >CE2&nbsp;</span>
                        <div className="spacers"></div>
                        <span className="niveaux" onClick={() => changeNiveau('CM1')}>CM1&nbsp;</span>
                        <div className="spacers"></div>
                        <span className="niveaux" onClick={() => changeNiveau('CM2')}>CM2&nbsp;</span>
                        <div className="spacers"></div>
                        <span className="niveaux"onClick={() => changeNiveau('6e')}>6e&nbsp;&nbsp;</span>
                        <div className="spacers"></div>
                        <span className="niveaux" onClick={() => changeNiveau('5e')}>5e&nbsp;&nbsp;</span>
                        <div className="spacers"></div>
                        <span className="niveaux" onClick={() => changeNiveau('4e')}>4e&nbsp;&nbsp;</span>
                    </div>
                    <br></br><br></br>

                    <div className="grid1">
                        <span className="niveaux" onClick={() => changeNiveau('3e')}> 3e&nbsp;&nbsp;</span>
                        <div className="spacers"></div>
                        <span className="niveaux" onClick={() => changeNiveau('2nde')}>2nde</span>
                        <div className="spacers"></div>
                        <span className="niveaux" onClick={() => changeNiveau('1ère')}> 1ère</span>
                        <div className="spacers"></div>
                        <span className="niveaux" onClick={() => changeNiveau('TL')}>TL&nbsp;&nbsp;</span>
                        <div className="spacers"></div>
                        <span className="niveaux" onClick={() => changeNiveau('TS')}>TS&nbsp;&nbsp;</span>
                        <div className="spacers"></div>
                        <span className="niveaux" onClick={() => changeNiveau('TES')}>TES&nbsp;</span>
                        <div className="spacers"></div>
                        <span className="niveaux" onClick={() => changeNiveau('TES')}>TES&nbsp;</span>
                    </div>
                </div>


                <div className="col-md-3"></div>
            </div>
            <br></br><br></br><br></br>
            <p className="deja_un_compte">Vous avez déjà un compte ? <Link to="/login"> Connecte-toi </Link></p>
            <div className="social-login-container">
                <div className="google-login-btn-container">
                    <Google />
                </div>

                <div className="facebook-login-btn-container">
                    <Facebook/>
                </div>

                <div className="email-login-container">
                    <Button className = 'submit-btn w-100'>S'inscrire avec un email</Button>
                </div>
            </div>
            
        </div>
    )
}
