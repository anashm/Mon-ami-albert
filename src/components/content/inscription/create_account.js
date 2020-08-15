import React from 'react';
import './create_account.css';
import photo_eleve from '../../../images/eleve.png';
import photo_parent from '../../../images/parent.png';
import photo_enseignant from '../../../images/enseignant.png';
import {Link} from 'react-router-dom';


export default function create_account() {

    

    return (
        <div className="container">
             <p  className="cree_ton_compte"><center>  CREE TON COMPTE </center></p>
          
             <p className="span_description">Si vous abonnez votre enfant, choisissez le profil parent.</p>

            
             <div className="row" style={{marginTop:'50px'}}>
                <div className="col-md-2"></div>
                    
                <div className="col-md-2">
                    <Link to="/eleve-creat-account">
                        <img className="images" src={photo_eleve} width="100%" />
                    </Link>
                    <span className="title_image">Elève</span>
                </div>

                <div className="col-md-1"></div>
                <div className="col-md-2">
                    {/* <Link to={{
                            pathname: "/individu-create-account",
                            state: {
                                fonction: "Parent"
                            }
                        }}> */}
                        <img className="images"  src={photo_parent}  width="100%"  />
                    {/* </Link> */}
                    <span className="title_image">Parent</span>
                </div>

                <div className="col-md-1"></div>
                <div className="col-md-2">
                    {/* <Link to="/wich-enseignant"> */}
                        <img className="images"  src={photo_enseignant} width="100%" />
                    {/* </Link> */}
                    <span className="title_image">Enseignant</span>
                </div>

                <div className="col-md-2"></div>
             </div>
             <p className="deja_un_compte">Vous avez déjà un compte ? <Link to="/login"> Connecte-toi </Link></p>
             <br></br><br></br>

            
        </div>
        
    )
}
