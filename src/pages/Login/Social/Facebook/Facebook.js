import React from 'react';
import FacebookLogin from 'react-facebook-login';


const Facebook = () => {

    const appID = "1088597931155576"

    const responseFacebook = (response) => console.log(response);
    


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
