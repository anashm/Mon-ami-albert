import React from 'react';
import { GoogleLogin } from 'react-google-login';


const Google = () => {

    const clientID = '417512310619-ge3jm2h91l5qjb8f3aj11mcbdvhvoj33.apps.googleusercontent.com';

    const handleSuccess = response => console.log('succccccccccccces');

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
