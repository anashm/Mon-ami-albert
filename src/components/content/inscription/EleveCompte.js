import React,{useState,useEffect,useContext } from 'react';
import './EleveCompte.css';
import {Link} from 'react-router-dom';

import Facebook from '../../../pages/Login/Social/Facebook/Facebook';
import { Button} from 'semantic-ui-react';
import NiveauComponent from './NiveauComponent';
//import database from '../../../firebase';
import {FirebaseContext} from '../../../firebase';
import { Form,Select} from 'semantic-ui-react';
import Title from '../../general/Title/Title';
import { useHistory } from "react-router-dom";
import SchoolSearchInput from './SchoolSearchInput/SchoolSearchInput'
import DefaultAvatar from '../../../images/avatars/Boy-3.png';
import avatar from '../../../images/avatar.png';
import { avatars } from '../../header/ProfileAvatars';
import Avatar from '../../header/Avatar/Avatar';
import {
    FacebookShareCount ,
    WhatsappShareButton,
    WhatsappIcon
   
  } from "react-share";

import UserContext from '../../../Context/UserContext/UserContext';

 const  EleveCompte = ( props ) =>  {

    const history = useHistory();
    
    //const Firebase = useContext(FirebaseContext)
    const [ sourceImage , setSourceImage] = useState('');

    const [childData, setChildData] = useState("");
    const [pays , setPays] = useState('');
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


    const handleAvatarClicked = src =>{
        setSourceImage(src);
        //console.log('hnaya' ,src)
    } 

    const getAvatarClicked = (avatar) => {
        setAvatar(avatar); 
        
    }
   /*  const handleSchoolChange = (e,result) => {
        setSchool(result.value)
    }

    const handleNiveauClicked = (src) => {
        setSourceImage(src)
    } */

    const handleChange = (value,pays) => {
        //console.log(value,pays)
        setSchool(value);
        setPays(pays)
    }

    const userContext = useContext(UserContext);
    

    useEffect(() => {
        //setAvatar('Boy-3')
        userContext.update_current_location(history.location.pathname);
        return () => {
            userContext.update_current_location("");
        }

    } , [])

    return (        
        <div className="container eleve-compte-section">

            <Title text = 'CREE TON COMPTE' textcentered centerOverlined />

            <div className="container-selectionne-ton-avatar">
                <h3 className="selectionne-ton-avatar">Sélectionne ton Avatar</h3>
            </div>

            <p className="quel_classe">En quelle classe es-tu en { new Date().getUTCFullYear() - 1 } - { new Date().getUTCFullYear() } ?</p>

            <div className="container-profil-images-scroll">
                {avatars.map( (avatar , index) => <Avatar avatarClicked = { handleAvatarClicked }  key={index} active = { sourceImage === avatar.image ? 'avatar_clicked' : 'image-avatar' }  getAvatar={getAvatarClicked} logo={avatar.image} name={avatar.name} />)}
            </div>
            <div className="grid1 mt-4">
                {niveaux.map( (niveau,index) => <span key={index}> <NiveauComponent key={index} niveau={niveau} setLevel = {setLevel} level = {level} /> </span> ) }
            </div>

            <div className="grid2">
                {(level.length > 0) && <SchoolSearchInput changed = { handleChange } /> }
            </div>

            <p className="deja_un_compte">Tu as déjà un compte ? <Link to="/login"> Connecte-toi </Link></p>

            {
                process.env.NODE_ENV === 'production' ?         <div className="email-login-container">
                {(school && level) ? (<Link to={{
                    pathname: "/sign-up",
                    state: {
                        fonction:level,
                        avatar : avatar,
                        etablissement : school,
                        pays : pays
                    }
                }}>
                <Button className = 'submit-btn w-100'>S'inscrire</Button>
                </Link> ) : <Button disabled className = 'submit-btn w-100'>S'inscrire</Button>}
                </div> :        <div className="email-login-container">
                {(school && level) ? (<Link to={{
                    pathname: "/register",
                    state: {
                        fonction:level,
                        avatar : avatar,
                        etablissement : school,
                        pays : pays
                    }
                }}>
                <Button className = 'submit-btn w-100'>S'inscrire</Button>
                </Link> ) : <Button disabled className = 'submit-btn w-100'>S'inscrire</Button>}
            </div>
            }

     

            <div className="facebook-login-btn-container mt-3">
                <Facebook navigation={props} />
            </div>
        </div>
    )
  
}


export default EleveCompte;