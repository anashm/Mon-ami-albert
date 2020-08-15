import React,{ useState,useContext } from 'react';
import FacebookLogin from 'react-facebook-login';
import {FirebaseContext} from '../../../../firebase'
import firebases from 'firebase';

const Facebook = ( props ) => {
    const firebase = useContext(FirebaseContext)

    const appID = "2769237243305382"

    const data = {
        usersRef : firebases.database().ref('users')
    }
    
    const saveUser = (createdUser) => {
       
        return data.usersRef.child(createdUser.user.uid).set({
            lastName: 'userFromFacebook',
            firstName: 'userFromFacebook',
            level:'Terminale'
        });
    }
    
    const responseFacebook = response => {
        //e.preventDefault();
       
        
        firebase.signupUser(response.email,'facebook')
        .then(user => {
            console.log(user)
            saveUser(user).then( () => {
                console.log('user saved') ;
                props.navigation.history.push('/dashboard-user')
            })
            //props.navigation.history.push('/dashboard-user')
        })
        .catch(errors => {
            //alert(errors)
            if(errors.code='auth/email-already-in-use'){
                firebase.loginUser(response.email,'facebook')
                .then(user => {

                    props.navigation.history.push('/dashboard-user')
                })
            }
                
        })
    }

    return (
        <FacebookLogin
        appId = { appID }
        fields="name,email,picture"
/*         onClick={componentClicked}
 */     callback={responseFacebook} 
        cssClass="facebook-login-btn"
        icon="fa-facebook"
        textButton = 'Se connecter avec Facebook'
        />
    )
}

export default Facebook
