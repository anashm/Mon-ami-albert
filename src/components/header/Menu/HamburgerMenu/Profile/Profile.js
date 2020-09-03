import React , { Fragment , useContext , useEffect , useState } from 'react';
import UserContext from '../../../../../Context/UserContext/UserContext';
import { useHistory } from "react-router-dom";

import { FirebaseContext } from '../../../../../firebase';

import logo from '../../../../../images/quizz/albert-quiz.png';

import { Loader } from 'semantic-ui-react';


const Profile = () => {

    const [ showProfile , seShowProfile ] = useState(false);

    const [avatarPath , setAvatarPath] = useState('');




    const history = useHistory();

    const firebase = useContext(FirebaseContext);
    const userContext = useContext(UserContext);

    const handleSignOut = () => {
        firebase.signOutUser().then(() => {
            userContext.get_connected_user(null);
            userContext.update_user_informations(null);
            history.push('/');
            seShowProfile(false);
        }).catch(e => console.log(e));
        
    }

    const handleSignIn = () => {
        history.push('/login');
    }

    useEffect (() => {

        if(userContext.user_informations){
            console.log(userContext.user_informations.avatar);
            setAvatarPath(userContext.user_informations.avatar);
            seShowProfile(true);
        }else{
            seShowProfile(false);

        }
    } , [userContext.user_informations]);

            return (
            <Fragment>
                { (showProfile) &&
                    <Fragment>
                    <img src={ require(`../../../../../images/avatars/${avatarPath}.png`) } alt=""/>
                    <button onClick = { handleSignOut }> Se deconnecter </button>
                    </Fragment>                    
                }

                { (!showProfile) &&
                    <Fragment>
                        <button onClick = { handleSignIn }> Se connecter </button>
                    </Fragment>                    
                }
            </Fragment>
            
        )


    
}

export default Profile
