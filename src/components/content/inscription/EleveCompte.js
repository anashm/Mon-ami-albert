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
import { Form,Select} from 'semantic-ui-react';
import Title from '../../general/Title/Title';

import SchoolSearchInput from './SchoolSearchInput/SchoolSearchInput'

 const  EleveCompte = ( props ) =>  {
    
    const Firebase = useContext(FirebaseContext)
    const [ sourceImage , setSourceImage] = useState('');

    const [childData, setChildData] = useState("");
    const [niveaux ,setNiveaux] = useState([]);
    const [school , setSchool] = useState('')

    useEffect(() => {
      
            const database = Firebase.getData();
            const ref_niveaux = database.ref('schoolLevels/all');
            ref_niveaux.on("value", snapshot => {
                setNiveaux(snapshot.val())
                console.log(snapshot.val())
            })
    }, []);


    const handleSchoolChange = (e,result) => {
        
        setSchool(result.value)
    }

    const handleNiveauClicked = (src) => {
        setSourceImage(src)
    }
    /* const HandleMatiereClicked = () => {
        console.log('clicked')
    } */

    const handleChange = value => setSchool(value);

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
                        
                        <p className="text-avatar">  <b> {childData} </b>&nbsp;&nbsp;
                        </p>
                    </div>
            </div>

            <p className="quel_classe">En quelle classe es-tu (2019-2020) ?</p>


            <div className="row">
                
                <div className="col">
                    <div className="grid1"> 
                        {niveaux.map( (niveau,index) => {
                         return (
                                <span key={index}>
                                <NiveauComponent 
                                    key={index} 
                                    niveau={niveau}
                                    passChildData={setChildData}
                                    niveauClicked = { handleNiveauClicked }
                                    active = { sourceImage === niveau ? 'niveaux_clicked' : 'niveaux' }
                                    /* matiereClicked = {HandleMatiereClicked}  */
                                    />  
                                    <div className="spacers"></div>
                                    
                                </span>
                                )                   
                            
                        }) }          

                    </div>
                    
                    <div className="grid2">
                        { console.log(school) }

                        {childData &&<SchoolSearchInput changed = { handleChange } />  }


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

                    {(childData && school) ? (<Link to={{
                            pathname: "/sign-up",
                            state: {
                                fonction:childData,
                                etablissement : school
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