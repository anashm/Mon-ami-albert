import React,{useState, Component,useEffect,useContext } from 'react';
import './EleveCompte.css';
import {Link} from 'react-router-dom';
import Google from '../../../pages/Login/Social/Google/Google';
import Facebook from '../../../pages/Login/Social/Facebook/Facebook';
import avatar from '../../../images/avatar.png';
import { Button} from 'semantic-ui-react';
import NiveauComponent from './NiveauComponent';
//import database from '../../../firebase';
import {AuthContext} from '../../../providers/LoginContext';
import {FirebaseContext} from '../../../firebase'
    

 const  EleveCompte = ( props ) =>  {
    
    const Firebase = useContext(FirebaseContext)


    const [childData, setChildData] = useState("");
    const [niveaux ,setNiveaux] = useState([]);


    useEffect(() => {
            const database = Firebase.getData();
            const ref = database.ref('schoolLevels/all');
            ref.on("value", snapshot => {
            // const messageObject = snapshot.val();
                setNiveaux(snapshot.val())
             
            })
    }, []);
    //console.log(ref)

    return (        
        <div className="container">
            <p  className="cree_ton_compte"><center>  CREE TON COMPTE </center></p>

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


            <div className="row" style={{marginTop:'60px'}}>
                <div className="col-md-3"></div>
                
                <div className="col-md-7">
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


                <div className="col-md-3"></div>
            </div>
            <br></br><br></br><br></br>
            <p className="deja_un_compte">Vous avez déjà un compte ? <Link to="/login"> Connecte-toi </Link></p>
            <div className="social-login-container">
                <div className="google-login-btn-container">
                    <Google />
                </div>

                <div className="facebook-login-btn-container">
                    <Facebook navigation={props} />
                </div>

                <div className="email-login-container">
                   <Link to={{
                            pathname: "/sign-up",
                            state: {
                                fonction:childData
                            }
                        }}>
                    <Button  className = 'submit-btn w-100'>S'inscrire avec un email</Button>
                    </Link> 
                </div>
            </div>
           
        </div>
    )
  
}


export default EleveCompte;