import React from 'react';

import Google from './Social/Google/Google';
import Facebook from './Social/Facebook/Facebook';
import LoginForm from './LoginForm/LoginForm' 

import { Divider } from 'semantic-ui-react';

import './style/Login.scss';

const Login = () => {


    return (
        <div className = 'login-content-container'>
            <div className="social-login-container">
                <div className="google-login-btn">
                    <Google />
                </div>

                <div className="facebook-login-btn">
                    <Facebook/>
                </div>
            </div>

            <Divider className = 'w-100' horizontal>Or</Divider>


            <div className="login-form-container">
                    <LoginForm />
            </div>
        </div>
    )
}

export default Login;
