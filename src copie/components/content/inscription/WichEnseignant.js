import React from 'react'
import './WichEnseignant.css';
import avatar from '../../../images/adulte_avatar.png';
import { Link } from 'react-router-dom';
import Title from '../../general/Title/Title';

const WichEnseignant = () => {
    return (
        <div className="container which-teacher-container">

            <Title text = 'CREEZ VOTRE COMPTE' textcentered centerOverlined />

            <div className="row" style={{marginTop:'-2%'}}>
                <div className="col-md-4"></div>
                <div className="col-md-4 teacher-text" style={{marginLeft:'4%' , marginTop : '5%'}} >
                    <div style={{float:"left",width:'20%'}}>
                        <img src={avatar} alt = "" style={{width : '70%'}} /> 
                    </div>
                    <p className="text-avatar"> Je suis un <b> Enseignant </b>.&nbsp;&nbsp;
                    <Link to="/creat-account"> Modifier </Link></p>
                </div>
            </div>
                
            <div className="listes_enseignants">
                <p className="title_enseignant">QUEL ENSEIGNANT ETES-VOUS?</p>

                <div style={{marginTop:'5%'}} className = 'teachers-container'>
                    <Link to={{
                            pathname: "/individu-create-account",
                            state: {
                                fonction: "Enseignant de l'éducation nationale"
                            }
                        }}> 
                        <span className="choix-enseignants">Education nationale&nbsp;&nbsp;&nbsp;</span>
                    </Link>

                    <div className="spacer"></div>

                    <Link to={{
                            pathname: "/individu-create-account",
                            state: {
                                fonction: "Professeur particulier"
                            }
                        }}>
                    <span className="choix-enseignants">Professeur particulier</span>
                    </Link>


                    <div className="spacer"></div>
                    <Link to={{
                            pathname: "/individu-create-account",
                            state: {
                                fonction: "Autre Enseignant"
                            }
                        }}>
                    <span className="choix-enseignants">&nbsp;&nbsp;&nbsp;&nbsp;Autre enseignant&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    </Link>
                </div>
            </div>
            <p className="deja_un_compte">Vous avez déjà un compte ? <Link to="/login"> Connecte-toi </Link></p>
        </div>
    )
}

export default WichEnseignant;
