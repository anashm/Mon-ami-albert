import React, { Component } from 'react'
import MatiereComponent from './Matieres/MatiereComponent';
import LogoMath from '../../images/Logo-math.png';
import LogoPhysique from '../../images/logo-physique.png';
import LogoAnglais from '../../images/logo-anglais.png';
import LogoGeo from '../../images/logo-geo.png';
import LogoPhilo from '../../images/logo-philo.png';
import LogoSVT from '../../images/logo-svt.png';
import LogoIng from '../../images/logo-ing.png';
import LogoJeux from '../../images/logo-jeux.png';
import { Link } from 'react-router-dom';

export default class Dashboard extends Component {
    render() {
        return (
            <div className="container">
                <p  className="cree_ton_compte"><center> TROISIEME </center></p>

                    <div className="row">
                        <div className="col-md-6">
                            <Link to="/chapitres">
                                <MatiereComponent title="Mathématiques" logo={LogoMath} />
                            </Link>
                        </div>
                        <div className="col-md-6">
                            <MatiereComponent title="Physique" logo={LogoPhysique} /> 
                        </div>
                    </div>
                    

                    <div className="row">
                        <div className="col-md-6">
                            <MatiereComponent title="Anglais" logo={LogoAnglais} />
                        </div>
                        <div className="col-md-6">
                            <MatiereComponent title="Histoire Géo" logo={LogoGeo} />
                        </div>
                    </div>    
                    
                    <div className="row">
                        <div className="col-md-6">
                            <MatiereComponent title="Philosophie" logo={LogoPhilo} />
                        </div>
                        <div className="col-md-6">
                            <MatiereComponent title="SVT" logo={LogoSVT} />
                        </div>
                    </div>   

                    <div className="row">
                        <div className="col-md-6">
                            <MatiereComponent title="Ingénierie" logo={LogoIng} />
                        </div>
                        <div className="col-md-6">
                             <MatiereComponent title="Jeux" logo={LogoJeux} />
                        </div>
                    </div> 
                    
                  
            </div>
        )
    }
}
