import React,{useState, Component,useEffect,useContext } from 'react';
import './EleveCompte.css';
import {Link} from 'react-router-dom';
import Google from '../../../pages/Login/Social/Google/Google';
import Facebook from '../../../pages/Login/Social/Facebook/Facebook';
import { Button} from 'semantic-ui-react';
import NiveauComponent from './NiveauComponent';
//import database from '../../../firebase';
import {FirebaseContext} from '../../../firebase';
import { Form,Select} from 'semantic-ui-react';
import Title from '../../general/Title/Title';
import { useHistory } from "react-router-dom";
import SchoolSearchInput from './SchoolSearchInput/SchoolSearchInput'

import avatar from '../../../images/avatar.png';
import { avatars } from '../../header/ProfileAvatars';
import Avatar from '../../header/Avatar/Avatar';
import {
    FacebookShareCount ,
    WhatsappShareButton,
    WhatsappIcon
   
  } from "react-share";

 const  EleveCompte = ( props ) =>  {
    
    //const Firebase = useContext(FirebaseContext)
    const [ sourceImage , setSourceImage] = useState('');

    const [childData, setChildData] = useState("");

    const [level , setLevel] = useState('');

    const [niveaux , ] = useState([
         "Maths Sup",
         "Maths Spe",
         "Terminale",
         "Première",
         "Seconde"
    ]);
    const [school , setSchool] = useState('')
    const [avatar , setAvatar] = useState('')


    const handleAvatarClicked = src => setSourceImage(src);

    const getAvatarClicked = (avatar) => {
        setAvatar(avatar);    
    }
   /*  const handleSchoolChange = (e,result) => {
        setSchool(result.value)
    }

    const handleNiveauClicked = (src) => {
        setSourceImage(src)
    } */

    const handleChange = value => setSchool(value);

    return (        
        <div className="container eleve-compte-section">

            {/* <WhatsappShareButton
            url="https://preprod.monamialbert.com/"
            title="from app"
            separator=":: "
            className="Demo__some-network__share-button"
          >
            <WhatsappIcon size={32} round />
          </WhatsappShareButton> */}

            <Title text = 'CREE TON COMPTE' textcentered centerOverlined />

            <div className="container-profil-images-scroll">
                {avatars.map( (avatar , index) => {
                        return(
                            <Avatar avatarClicked = { handleAvatarClicked }  key={index} active = { sourceImage === avatar.image ? 'avatar_clicked' : 'image-avatar' }  getAvatar={getAvatarClicked} logo={avatar.image} name={avatar.name} />
                        )
                })}

            </div>
            {/* <div className="row justify-content-center align-items-center">
                <img src={avatar} alt = '' /> 
                <p className="text-avatar"> {childData} </p>
            </div> */}

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
                                    setLevel = {setLevel}
                                    level = {level}
                                />  
                                </span>
                            )                   
                        }) }          
                    </div>
                    
                    <div className="grid2">
                        { console.log(school) }
                        {(level.length > 0) && <SchoolSearchInput changed = { handleChange } />  }
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

                    {(school && level) ? (<Link to={{
                            pathname: "/sign-up",
                            state: {
                                fonction:level,
                                avatar : avatar,
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