import React,{useEffect,useContext,useState , Fragment} from 'react'
import { Input,Form,Button,Checkbox , Loader , Dimmer } from 'semantic-ui-react';
import {FirebaseContext} from '../../firebase';
import UserContext from '../../Context/UserContext/UserContext';
import { useHistory } from "react-router-dom";

import Avatar from './Avatar/Avatar';
import './ProfilPage.css';
import firebase_db from "firebase/app";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-bootstrap/Modal';
import {
    FacebookShareButton ,
    FacebookIcon,
    WhatsappShareButton,
    WhatsappIcon
   
  } from "react-share";

  import { Spinner } from 'react-bootstrap';
  import { avatars } from './ProfileAvatars';


export default function ProfilPage() {

    

    const firebase = useContext(FirebaseContext)
    const userContext = useContext(UserContext)
    const history = useHistory();
    const [firstName , setfirstName] = useState('')
    const [lastName , setlastName] = useState('')
    const [email , setEmail] = useState('')
    const [checked , setChecked ] = useState(false)
    const [passwordChecked , setPasswordChecked ] = useState(false)
    const [clickedAvatar,setClickedAvatar] = useState(null)
    const [currentPassword,setcurrentPassword] = useState('')
    const [newPassword,setNewPassword] = useState('')
    const [avatar , setAvatar] = useState(null)
    const[showToast,setShowToast] = useState(false)
    const [ level ,setLevel] = useState('')
    const [ etablissement ,setEtablissement] = useState('');
    const [ loading , setLoading ] = useState(true);
    const [showModal , setShowModal] = useState(false)
    const [textModal , setTextModal] = useState('')
    const [showSocialIcons , setShowSocialIcons] = useState(false)

  
    useEffect(() => {
        if( userContext.user && userContext.user_informations){
            setEmail(userContext.user.email);
            setfirstName(userContext.user_informations.firstName);
            setlastName(userContext.user_informations.lastName);
            setAvatar(userContext.user_informations.avatar);
            setEtablissement(userContext.user_informations.etablissement);
            setLevel(userContext.user_informations.level);
            setLoading(false)
        }

    }, [userContext.user , userContext.user_informations]);


    const HandleChangeFirstName = (e) => setfirstName(e.target.value)

    const HandleChangeEmail = (e) => setEmail(e.target.value)
    
    const HandleChangeLastName = (e) => setlastName(e.target.value)
    
    const HandleChecked = (e) => (!checked ? setChecked(true) : setChecked(false))
    
    const HandleCheckedPassword = (e) =>  (!passwordChecked ? setPasswordChecked(true) : setPasswordChecked(false))

    const [ sourceImage , setSourceImage] = useState('');

    const handleAvatarClicked = src => setSourceImage(src);
    
    const getAvatarClicked = (avatar) => {
        setAvatar(avatar);    
        setClickedAvatar(avatar);
    }
    
    const reauthenticates = (currentPassword) => {
        const utilisateur = firebase_db.auth().currentUser;
        const cred = firebase_db.auth.EmailAuthProvider.credential(utilisateur.email,currentPassword)
        return utilisateur.reauthenticateWithCredential(cred);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if(userContext.user){
            //code if realod page pour garder context api values
            const user =  userContext.user; 
            const userId = user.uid;                    
            const database = firebase.getData();
            const reference =  database.ref('users/')
            
            let utilisateur = firebase_db.auth().currentUser;
            
            reauthenticates(currentPassword).then(() => {                  
                user.updatePassword(newPassword).then(function() {
                    
                    }).catch(function(error) {
                    
                    });
                    if(clickedAvatar){
                    reference.child(userId).update({
                        lastName:  firstName,
                        firstName : lastName,
                        avatar : clickedAvatar
                    }).then(() => {
                        //history.push('/dashboard-user') 
                        setShowToast(true)    
                        toast.success("Votre Profil a été mis à jour ! 🧐");
                    })
                }
                else{
                    reference.child(userId).update({
                        lastName:  firstName,
                        firstName : lastName
                    }).then(() => {
                        //history.push('/dashboard-user') 
                        setShowToast(true)    
                        toast.success("Votre Profil a été mis à jour ! 🧐");
                    })
                }

                }).catch(function(error) {
                    setShowToast(true) 
                    toast.error("Ce mot de passe ne correspond pas à cet utilisateur!");
            });
            
        }
    }

    const HandleShowModalBesoinProf = () => {
        setShowModal(true)
        setTextModal("T'inquiète,je vais te mettre bien ! Un de mes conseillers va t'appeler dans les 24 heures .")
    }

    const HandleShowModalBesoinBilan = () => {
        setShowModal(true)
        setTextModal(" T'inquiète,je gère! Un de mes conseillers  va t'appeler dans les 24 heures.")
    }

    if(loading){
        return ( <div className="container">
            <div className="row justify-content-center align-items-center" style = {{ minHeight: '50vh' }} >
                <Spinner animation="grow" />
            </div>
        </div> )
    }
    

    return (
        <div className = 'login-content-container'>

            <div className="profile-image-container">
                <div className="image-container">
                    { avatar ? <img src={require(`../../images/avatars/${avatar}.png`)} alt = '' /> : ''}
                </div>
                <div className="user-infos">
                    <span>Niveau  : <span className="class-answers-etablissements"> {level} </span>  </span>
                    <span>Institution  : <span className="class-answers-etablissements">  {etablissement} </span> </span>
                </div>
            </div>

            <Form onSubmit={handleSubmit} className = 'profile-form'>
                <Form.Field>
                    <label>Prénom</label>
                    <input placeholder='Prénom' value={firstName}  onChange={HandleChangeFirstName} />
                </Form.Field>

                <Form.Field>
                    <label>Nom</label>
                    <input placeholder='Nom' value={lastName} onChange={HandleChangeLastName}  />
                </Form.Field>

                <Form.Field>
                    <label>Votre mot de passe</label>
                    <input type="password" placeholder='Votre mot de passe' value={currentPassword} onChange={(e) => { setcurrentPassword(e.target.value)}}  />
                </Form.Field>

                <Form.Field>
                    <Checkbox label="Modifier le mot de passe"  onChange={HandleCheckedPassword} />
                </Form.Field>

                {showToast ? <ToastContainer hideProgressBar={true} /> : ''}
                
                {
                    passwordChecked ? (
                        <div>
                            <Form.Field>
                                <label>Nouveau mot de pass</label>
                                <input type="password" placeholder='Nouveau mot de pass' value={newPassword} onChange={(e) => { setNewPassword(e.target.value)}} />
                            </Form.Field>
                        </div>
                    ) : ''
                }
                {/* <Form.Field>
                    <label>Email</label>
                    <input placeholder='Email' value={email} onChange={HandleChangeEmail}  />
                </Form.Field> */}
                <Form.Field>
                    <Checkbox label="Modifier l'avatar"  onChange={HandleChecked} />
                </Form.Field>

                {checked ? (
                <div className="images_profil_container">
                    {avatars.map( (avatar , index) => {
                        return(
                            <Avatar avatarClicked = { handleAvatarClicked }  key={index} active = { sourceImage === avatar.image ? 'avatar_clicked' : 'image-avatar' }  getAvatar={getAvatarClicked} logo={avatar.image} name={avatar.name} />
                        )
                    })}
                    
                </div>
                ) : '' }
                
                <Button type="submit"  className = 'profile-submit-btn' style={{color :'white'}}>Mettre à jour</Button>
            </Form>

            <div>
                <Button onClick={HandleShowModalBesoinProf}  id="button_besoin_prof">BESOIN D'UN PROF A TES COTES ?</Button>

                <Button   id="button_inviter_ami" onClick={() => setShowSocialIcons(true)} >INVITER UN AMI</Button>
                    {
                        showSocialIcons ? 
                        <div className="div_social_media_container">
                            <WhatsappShareButton
                                url="https://preprod.monamialbert.com/"
                                title="Rejoins les amis d’Albert, veuillez utiliser mon code de parrainage"
                                separator=":"
                                className="Demo__some-network__share-button"
                            >
                                <div className="share_on_whatsapp">
                                    <WhatsappIcon size={32} round />
                                    <span className="st-label">Partager</span>
                                </div>
                                
                            </WhatsappShareButton>

                            <FacebookShareButton
                                url="https://preprod.monamialbert.com/"
                                title="Rejoins les amis d’Albert, veuillez utiliser mon code de parrainage"
                                separator=":"
                                className="Demo__some-network__share-button"
                            >
                                <div className="share_on_facebook">
                                    <FacebookIcon size={32} round />
                                    <span className="st-label">Partager</span>
                                </div>
                               {/* <Button>Share on facebook</Button>  */}
                                {/* <FacebookIcon size={32} round /> */}
                            </FacebookShareButton>
                        </div> : ''

                    }

                <Button onClick={HandleShowModalBesoinBilan} id="button_besoin_bilan"  >BESOIN D'UN BILAN PEDAGOGIQUE ?</Button>
            </div> 

            <Modal
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={showModal}
                onHide={() => setShowModal(false)}
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body >
                        {textModal}
                    </Modal.Body>
            </Modal>     
        </div>
    )
}
