import React , { useEffect , useContext } from 'react';

/* import Google from './Social/Google/Google';
 */
import Facebook from './Social/Facebook/Facebook';
import LoginForm from './LoginForm/LoginForm' 

import Title from '../../components/general/Title/Title';

import { Divider } from 'semantic-ui-react';
/* import Header from '../../components/header/Header';*/

import { useHistory } from 'react-router-dom';

import UserContext from '../../Context/UserContext/UserContext';

import './style/Login.scss';

const Login = (props) => {

    const history = useHistory();

    const userContext = useContext(UserContext);


    useEffect(() => {
        userContext.update_current_location(history.location.pathname);
        return () => {
            userContext.update_current_location("");
        }

    } , []);


    return (
       
        <div className = 'login-content-container'>

            <Title text = 'Connecte toi' textcentered centerOverlined />

            <Divider hidden />

            <div className="social-login-container">
                <div className="facebook-login-btn-container">
                    <Facebook navigation={props}/>
                </div>
            </div>

            <Divider className = 'w-100 my-4' horizontal>Ou</Divider>

            <div className="login-form-container">
                <LoginForm navigation={props} />
            </div>
        </div>

    )
}

export default Login;
