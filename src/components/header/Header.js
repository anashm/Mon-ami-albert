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
import { Button, Popup,Dropdown, DropdownMenu } from 'semantic-ui-react'
//import { Dropdown } from 'react-bootstrap';

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
                        {/* <div className="phone-number-container">  
                            <span className="phone_number"> <FaPhoneAlt  /> &nbsp;&nbsp; 05 22 33 44 55</span>
                            { logout ?  <Link to = '/' className="contact-link dark-color">Contact</Link> : null}
                        </div> */}

                        <div className="logout-container">
                            {!logout ? 
                                ( 
                                
                                <div className="div_logout_container">
                                    {/* <Dropdown>
                                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                                        <img src={Avatar} width='20%'  />
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                   
                                        <Dropdown.Item href="/profil" >Profil</Dropdown.Item>
                                   
                                       
                                    </Dropdown.Menu>
                                    </Dropdown> */}
                                   

                                   <Dropdown text='Mon compte' pointing className='link item'>
                                        <Dropdown.Menu>

                                            <Dropdown.Header> <span className="dropdown-header-titles"> Profil </span></Dropdown.Header>                                                                                 
                                                
                                                <Dropdown.Item> 
                                                    <Link to="/profil">                                                                                                           
                                                    <span className="mon-profil-item-class">Mon Profil</span>
                                                    </Link>                                                       
                                                </Dropdown.Item>

                                            <Dropdown.Divider />

                                            <Dropdown.Header> <span className="dropdown-header-titles"> Classement </span> </Dropdown.Header>
                                                <Dropdown.Item><span  >Général</span></Dropdown.Item>
                                                <Dropdown.Item><span  >Lycées</span></Dropdown.Item>
                                            <Dropdown.Divider />
                                            
                                            <Dropdown.Item><span  onClick={HandleLogout}>Déconnexion</span></Dropdown.Item>
                                           
                                        </Dropdown.Menu>
                                    </Dropdown>
                                   {/* <Popup
                                        content='I will not flip!'
                                        on='click'
                                        pinned
                                        trigger={<Button content='Button' />}
                                    /> */}
                                    {/* <span className="logout-link contact-style" onClick={HandleLogout}>Déconnexion</span> */}
                                </div>
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