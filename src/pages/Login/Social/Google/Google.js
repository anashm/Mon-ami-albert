import React from 'react';
import { GoogleLogin } from 'react-google-login';


const Google = () => {

    const clientID = '658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com';

    const handleSuccess = response => console.log(response);

    const handleFailure = response => console.log(response);

    return (
            <GoogleLogin
                className = 'google-login-btn'
                clientId = {clientID}
                buttonText="Se connecter avec Google"
                onSuccess={handleSuccess}
                onFailure={handleFailure}
            />
    );
}

export default Google;
