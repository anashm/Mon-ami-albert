import React from 'react'
import image_einsten  from '../../../images/einsten.png';
import './Thirddiv.css';

export default function Thirddiv() {
    return (
        <div className="container">
            <span  className="pourquoi_me_choisir"><center> <hr className="hr"></hr> POURQUOI ME CHOISIR ? </center></span>

            <div className="row">


                <div className="col-md-4" style={{marginTop:'100px'}}>
                    <div className="numbers_container">
                        <span className="number_pourquoi_choisir">1</span>
                        
                        <div className="explications">Soutien scolaire  pour toute les classes</div>
                    </div>
                    <div className="numbers_container">
                        <span className="number_pourquoi_choisir">2</span>
                        
                        <div className="explications">Cours et exercices dans toutes les matières</div>
                    </div>
                    <div className="numbers_container">
                        <span className="number_pourquoi_choisir">3</span>
                        <div className="explications">4 points en plus  sur la moyenne</div>
                    </div>
                </div>


                <div className="col-md-4">
                    <img src={image_einsten} style={{width:'70%',margin:'15%'}} />
                </div>


                <div className="col-md-4" style={{marginTop:'100px'}}>
                    <div className="numbers_container">
                        <span className="number_pourquoi_choisir">4</span>
                        <div className="explications">des Professeurs en ligne et par chat</div>
                    </div>
                    <div className="numbers_container">
                        <span className="number_pourquoi_choisir">5</span>
                        <div className="explications">Assistance parents  par téléphone</div>
                    </div>
                    <div className="numbers_container">
                        <span className="number_pourquoi_choisir">6</span>
                        <div className="explications">Service personnalisé  sur la moyenne</div>
                    </div>
                </div>


            </div>
        </div>
    )
}
