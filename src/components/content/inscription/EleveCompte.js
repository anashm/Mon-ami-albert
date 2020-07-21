import React from 'react';
import './EleveCompte.css';

export default function EleveCompte() {
    return (
        <div className="container">
            <p  className="cree_ton_compte"><center>  CREE TON COMPTE </center></p>
           

            <p className="quel_classe">En quelle classe es-tu (2019-2020) ?</p>


            <div className="row">
                <div className="col-md-3"></div>
                
                <div className="col-md-6">
                    <div className="grid1">
                        <span className="niveaux">CE1</span>
                        <span className="niveaux">CE1</span>
                        <span className="niveaux">CE1</span>
                        <span className="niveaux">CE1</span>
                        <span className="niveaux">CE1</span>
                        <span className="niveaux">CE1</span>
                        <span className="niveaux">CE1</span>
                    </div>
                </div>


                <div className="col-md-3"></div>
            </div>
            <br></br><br></br>
        </div>
    )
}
