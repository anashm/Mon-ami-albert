import React from 'react';
import './EleveCompte.css';
import {Link} from 'react-router-dom';

export default function EleveCompte() {
    return (
        <div className="container">
            <p  className="cree_ton_compte"><center>  CREE TON COMPTE </center></p>
           

            <p className="quel_classe">En quelle classe es-tu (2019-2020) ?</p>


            <div className="row" style={{marginTop:'60px'}}>
                <div className="col-md-2"></div>
                
                <div className="col-md-7">
                    <div className="grid1">
                        <span className="niveaux">CE1</span>
                        <div className="spacer"></div>
                        <span className="niveaux">CE2</span>
                        <div className="spacer"></div>
                        <span className="niveaux">CM1</span>
                        <div className="spacer"></div>
                        <span className="niveaux">CM2</span>
                        <div className="spacer"></div>
                        <span className="niveaux">6e&nbsp;</span>
                        <div className="spacer"></div>
                        <span className="niveaux">5e&nbsp;</span>
                        <div className="spacer"></div>
                        <span className="niveaux">4e&nbsp;</span>
                    </div>
                    <br></br><br></br>

                    <div className="grid1">
                        <span className="niveaux">CE1</span>
                        <div className="spacer"></div>
                        <span className="niveaux">CE2</span>
                        <div className="spacer"></div>
                        <span className="niveaux">CM1</span>
                        <div className="spacer"></div>
                        <span className="niveaux">CM2</span>
                        <div className="spacer"></div>
                        <span className="niveaux">6e&nbsp;</span>
                        <div className="spacer"></div>
                        <span className="niveaux">5e&nbsp;</span>
                        <div className="spacer"></div>
                        <span className="niveaux">4e&nbsp;</span>
                    </div>
                </div>


                <div className="col-md-3"></div>
            </div>
            <br></br><br></br><br></br>
            <p className="deja_un_compte">Vous avez déjà un compte ? <Link to="/"> Connecte-toi </Link></p>
            {/* <br></br><br></br><br></br><br></br> */}
        </div>
    )
}
