import React,{useState, Component,useEffect,useContext } from 'react';
import './EleveCompte.css';
import {Link} from 'react-router-dom';
import Google from '../../../pages/Login/Social/Google/Google';
import Facebook from '../../../pages/Login/Social/Facebook/Facebook';
import avatar from '../../../images/avatar.png';
import { Button} from 'semantic-ui-react';
import NiveauComponent from './NiveauComponent';
//import database from '../../../firebase';
import {FirebaseContext} from '../../../firebase';

import Title from '../../general/Title/Title';
    

 const  EleveCompte = ( props ) =>  {
    
    const Firebase = useContext(FirebaseContext)


    const [childData, setChildData] = useState("");
    const [niveaux ,setNiveaux] = useState([]);


    useEffect(() => {
      
            const database = Firebase.getData();
            const ref_niveaux = database.ref('schoolLevels/all');
            ref_niveaux.on("value", snapshot => {
            // const messageObject = snapshot.val();
                setNiveaux(snapshot.val())
                console.log(snapshot.val())
            })
    }, []);
    //console.log(ref)

    return (        
        <div className="container">
            <p  className="cree_ton_compte"><center>   </center></p>

            <Title text = 'CREE TON COMPTE' textcentered centerOverlined />

            <div className="row" style={{marginTop:'-2%'}}>
                    <div className="col-md-4"></div>

                    <div className="col-md-4" style={{marginLeft:'4%'}}>
                        <div style={{float:"left",width:'20%'}}>
                             <img src={avatar} style={{width : '70%'}} /> 
                        </div>
                        
                        <p className="text-avatar"> Je suis un élève de <b> {childData} </b>&nbsp;&nbsp;
                        <Link to="/creat-account"> Modifier </Link></p>
                    </div>
            </div>

            <p className="quel_classe">En quelle classe es-tu (2019-2020) ?</p>


            <div className="row">
                
                <div className="col">
                    <div className="grid1"> 
                        {niveaux.map( (niveau,index) => {
                         return (
                                <span>
                                <NiveauComponent 
                                    key={index} 
                                    niveau={niveau}
                                    passChildData={setChildData} 
                                    />  
                                    <div className="spacers"></div>
                                    
                                </span>
                                )                   
                            
                           
                        }) }          
                      
                     
                    </div>
                    

                   
                </div>


            </div>
            <p className="deja_un_compte">Vous avez déjà un compte ? <Link to="/login"> Connecte-toi </Link></p>
            <div className="social-login-container">
                {/* <div className="google-login-btn-container">
                    <Google />
                </div> */}

                <div className="facebook-login-btn-container">
                    <Facebook navigation={props} />
                </div>

                <div className="email-login-container">
                    {childData ? (<Link to={{
                            pathname: "/sign-up",
                            state: {
                                fonction:childData
                            }
                        }}>
                    <Button  className = 'submit-btn w-100'>S'inscrire avec un email</Button>
                    </Link> ) : <Button disabled  className = 'submit-btn w-100'>S'inscrire avec un email</Button>}
                   
                  {/*  <Link to={{
                            pathname: "/sign-up",
                            state: {
                                fonction:childData
                            }
                        }}>
                    <Button  className = 'submit-btn w-100'>S'inscrire avec un email</Button>
                    </Link>  */}
                </div>
            </div>
           
        </div>
    )
  
}


export default EleveCompte;