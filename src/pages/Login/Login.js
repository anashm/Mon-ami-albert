import React from 'react';

import Google from './Social/Google/Google';
import Facebook from './Social/Facebook/Facebook';
import LoginForm from './LoginForm/LoginForm' 

import { Divider } from 'semantic-ui-react';

import './style/Login.scss';

const Login = (props) => {


    return (
        <div className = 'login-content-container'>

            <div className="login-title-container">
                <h2 className="login-title">Connecte-toi</h2>
            </div>

            <Divider hidden />


            <div className="social-login-container">
                <div className="google-login-btn-container">
                    <Google />
                </div>

                <div className="facebook-login-btn-container">
                    <Facebook navigation={props}/>
                </div>
            </div>

            <Divider className = 'w-100 my-4' horizontal>Or</Divider>


            <div className="login-form-container">
                    <LoginForm navigation={props} />
            </div>
        </div>
    )
}

export default Login;
