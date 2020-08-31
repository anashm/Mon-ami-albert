import React,{useEffect,useContext,useState} from 'react'
import { Input,Form,Button,Checkbox } from 'semantic-ui-react';
import {FirebaseContext} from '../../firebase';
import UserContext from '../../Context/UserContext/UserContext';
import { useHistory } from "react-router-dom";
import Boy1 from '../../images/avatars/Boy-1.png'
import Boy2 from '../../images/avatars/Boy-2.png'
import Boy3 from '../../images/avatars/Boy-3.png'
import Boy4 from '../../images/avatars/Boy-4.png'
import Boy5 from '../../images/avatars/Boy-5.png'
import Girl1 from '../../images/avatars/Girl-1.png'
import Girl2 from '../../images/avatars/Girl-2.png'
import Girl3 from '../../images/avatars/Girl-3.png'
import Girl4 from '../../images/avatars/Girl-4.png'
import Girl5 from '../../images/avatars/Girl-5.png'
import Avatar from './Avatar/Avatar';
import './ProfilPage.css';
import firebase_db from "firebase/app";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



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

    const[showToast,setShowToast] = useState(false)
    const avatars = [
        {
            image : Boy1,
            name : 'Boy-1'
        },
        {
            image : Boy2,
            name : 'Boy-2'
        },
        {
            image : Boy3,
            name : 'Boy-3'
        },
        {
            image : Boy4,
            name : 'Boy-4'
        },
        {
            image : Boy5,
            name : 'Boy-5'
        },
        {
            image : Girl1,
            name : 'Girl-1'
        },
        {
            image : Girl2,
            name : 'Girl-2'
        },
        {
            image : Girl3,
            name : 'Girl-3'
        },
        {
            image : Girl4,
            name : 'Girl-4'
        },
        {
            image : Girl5,
            name : 'Girl-5'
        },
        
    ]
    useEffect(() => {

  

    firebase.auth.onAuthStateChanged( user => {
        if(user){
            //code if realod page pour garder context api values
            userContext.get_connected_user(user);
            const userId = user.uid;                      
            const database = firebase.getData();
            const reference =  database.ref('users/'+userId)

            reference.once("value", user_informations => {
                userContext.get_user_informations(user_informations.val());
                
              
                setEmail(user.email)
                setfirstName(user_informations.val().firstName)
                setlastName(user_informations.val().lastName)
            })
            /* setUserConnectedId(userId)

            reference.once("value", user_informations => {
                userContext.get_user_informations(user_informations.val());
            }) */
        }
            else{
            console.log('not login');
            history.push('/')
            }
        });
    }, []);


    const HandleChangeFirstName = (e) => {
        
        setfirstName(e.target.value)
    }

    const HandleChangeEmail = (e) => {
        setEmail(e.target.value)
    }

    const HandleChangeLastName = (e) => {
        setlastName(e.target.value)
    }

    const HandleChecked = (e) => {
        (!checked ? setChecked(true) : setChecked(false))
       

    }

    const HandleCheckedPassword = (e) => {
        (!passwordChecked ? setPasswordChecked(true) : setPasswordChecked(false))
        
    }

    const [ sourceImage , setSourceImage] = useState('');

    const handleAvatarClicked = src => {
        setSourceImage(src);
    }


    
    const getAvatarClicked = (avatar) => {
             
        setClickedAvatar(avatar)
    }
    
    const reauthenticates = (currentPassword) => {
        var utilisateur = firebase_db.auth().currentUser;
        var cred = firebase_db.auth.EmailAuthProvider.credential(utilisateur.email,currentPassword)
        return utilisateur.reauthenticateWithCredential(cred);
    }
    
    const handleSubmit = (e) => {
      
        e.preventDefault();
   
        
       /*  var utilisateur = firebase_db.auth().currentUser;
        utilisateur.updatePassword('1234567').then(function() {
            console.log('dkhal')
          }).catch(function(error) {
            console.log(error)
          }); */

        firebase.auth.onAuthStateChanged( user => {
            if(user){
                //code if realod page pour garder context api values
                userContext.get_connected_user(user);
                const userId = user.uid;                      
                const database = firebase.getData();
                const reference =  database.ref('users/')
                
                var utilisateur = firebase_db.auth().currentUser;
               
                
                reauthenticates(currentPassword).then(() => {                  
                    user.updatePassword(newPassword).then(function() {
                        console.log('dkhal')
                      }).catch(function(error) {
                        
                      });
                      reference.child(userId).update({
                        lastName:  firstName,
                        firstName : lastName,
                        avatar : clickedAvatar
                    }).then(() => {
                        //history.push('/dashboard-user') 
                        setShowToast(true)    
                        toast.success("Votre Profil a été mis à jour ! 🧐");
                    })
                }).catch(function(error) {
                        setShowToast(true) 
                        toast.error("Ce mot de passe ne correspond pas à cet utilisateur!");
                  });
                
                
                    
                  
                 
               
            }
            else{
            console.log('not login');
            history.push('/')
            }
            });
      

        
    }

    return (
        <div className = 'login-content-container'>
           
            <Form onSubmit={handleSubmit}>

                <Form.Field>
                    <label>First Name</label>
                    <input placeholder='First Name' value={firstName}  onChange={HandleChangeFirstName} />
                </Form.Field>


                <Form.Field>
                    <label>Last Name</label>
                    <input placeholder='Last Name' value={lastName} onChange={HandleChangeLastName}  />
                </Form.Field>

                <Form.Field>
                    <label>Current Password</label>
                    <input type="password" placeholder='Current Password' value={currentPassword} onChange={(e) => { setcurrentPassword(e.target.value)}}  />
                </Form.Field>

                <Form.Field>
                    <Checkbox label="Modifier le mot de passe"  onChange={HandleCheckedPassword} />
                </Form.Field>

                {showToast ? <ToastContainer hideProgressBar={true} /> : ''}
                

                {
                    passwordChecked ? (
                        <div>
                             

                            <Form.Field>
                                <label>New Password</label>
                                <input type="password" placeholder='New Password' value={newPassword} onChange={(e) => { setNewPassword(e.target.value)}} />
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
                
                <Button type='submit' style={{color :'white'}}>Mettre à jour</Button>

            </Form>
        </div>
    )
}
