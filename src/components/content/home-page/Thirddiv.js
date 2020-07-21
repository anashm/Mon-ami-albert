import React from 'react'
import image_einsten  from '../../../images/einsten.png';
import './Thirddiv.css';

export default function Thirddiv() {
    return (
        <div className="container">
            <span  className="pourquoi_me_choisir"><center> <hr className="hr"></hr> POURQUOI ME CHOISIR ? </center></span>

            <div className="row">
                <div className="col-md-1"></div>


                <div className="col-md-3" style={{marginTop:'100px'}}>
                    <div className="numbers_container">
                        <span className="number_pourquoi_choisir">1</span>
                        
                        <div className="explications"><br></br>Soutien scolaire  pour toute les classes</div>
                    </div><br></br><br></br><br></br>
                    <div className="numbers_container">
                        <span className="number_pourquoi_choisir">2</span>
                        
                        <div className="explications"><br></br>Cours et exercices dans toutes les matières</div>
                    </div><br></br><br></br><br></br>
                    <div className="numbers_container">
                        <span className="number_pourquoi_choisir">3</span>
                        <div className="explications"><br></br>4 points en plus  sur la moyenne</div>
                    </div>
                </div>


                <div className="col-md-4">
                    <img src={image_einsten} style={{width:'70%',margin:'15%'}} />
                </div>


                <div className="col-md-3" style={{marginTop:'100px'}}>
                    <div className="numbers_container">
                        <span className="number_pourquoi_choisir">4</span>
                        <div className="explications"><br></br>des Professeurs en ligne et par chat</div>
                    </div><br></br><br></br><br></br>
                    <div className="numbers_container">
                        <span className="number_pourquoi_choisir">5</span>
                        <div className="explications"><br></br>Assistance parents  par téléphone</div>
                    </div><br></br><br></br><br></br>
                    <div className="numbers_container">
                        <span className="number_pourquoi_choisir">6</span>
                        <div className="explications"><br></br>Service personnalisé  sur la moyenne</div>
                    </div>
                </div>


                <div className="col-md-1"></div>
            </div>
        </div>
    )
}
