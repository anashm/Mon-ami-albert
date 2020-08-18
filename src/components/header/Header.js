import React,{useState,useEffect,useContext} from 'react';
import './header.scss';
import logo from '../../images/MON_AMIALBERT2.svg';
import { FaPhoneAlt  } from 'react-icons/fa'
import {Link} from 'react-router-dom';
import {FirebaseContext} from '../../firebase'
import UserContext from '../../Context/UserContext/UserContext';
import HamburgerMenu from './Menu/HamburgerMenu/HamburgerMenu';
import { useHistory } from "react-router-dom";
import Avatar from '../../images/avatar.png'

import { Dropdown } from 'react-bootstrap';

const Header = () =>  {

    const history = useHistory();

    const userContext = useContext(UserContext);
    const firebase = useContext(FirebaseContext)

    const [logout , setLogout] = useState(false);
    const connectedUser = userContext.user;

    const HandleLogout = () => {
        firebase.signOutUser();
        userContext.get_connected_user(null);
        history.push('/');
    }

    useEffect( () => {
        if(connectedUser){
            setLogout(false);
        }else{
            setLogout(true);
        }
    }, [connectedUser]);




    return (  
        <header className = 'container-fluid header'>   
            <div className="container">
                <div className="row header-row">
                    <div className="header-logo-container">
                        <Link to="/"> <img src={logo} className = 'header-logo-img' alt = '' /> </Link>
                    </div>

                    <div className="contact-container">
                        <div className="phone-number-container">  
                            <span className="phone_number"> <FaPhoneAlt  /> &nbsp;&nbsp; 05 22 33 44 55</span>
                            { logout ?  <Link to = '/' className="contact-link dark-color">Contact</Link> : null}
                        </div>

                        <div className="logout-container">
                            {!logout ? 
                                ( 
                                <span className="logout-link contact-style" onClick={HandleLogout}>Déconnexion</span>
                                /* <div className="div_logout_container">
                                    <Dropdown>
                                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                                        <img src={Avatar} width='20%'  />
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                    </Dropdown.Menu>
                                    </Dropdown>
                                   
                                    <span className="logout-link contact-style" onClick={HandleLogout}>Déconnexion</span>
                                </div> */
                                ) 
                                 : null
                            }
                        </div>
                    </div>
                    <HamburgerMenu />
                </div>
            </div>
        </header>  
    )
}

export default Header;