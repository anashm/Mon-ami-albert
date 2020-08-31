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
/* import { Button, Popup,Dropdown, DropdownMenu } from 'semantic-ui-react'; */
import { Modal,Button } from 'react-bootstrap';
import { Dropdown } from 'semantic-ui-react';



const Header = () =>  {

    const options = [
        { key: 1, text: 'Choice 1', value: 1 },
        { key: 2, text: 'Choice 2', value: 2 },
        { key: 3, text: 'Choice 3', value: 3 },
      ]

    const history = useHistory();

    const userContext = useContext(UserContext);
    const firebase = useContext(FirebaseContext)

    const [logout , setLogout] = useState(false);
    const connectedUser = userContext.user;

    const HandleLogout = () => {
        firebase.signOutUser();
        userContext.get_connected_user(null);
        setShowModal(false)
        history.push('/');
    }

    useEffect( () => {
        if(connectedUser){
            setLogout(false);
        }else{
            setLogout(true);
        }
    }, [connectedUser]);


    const [ showModal , setShowModal ] = useState(false);

   

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
                                   
                                   
                                   {/* <Dropdown text='Mon compte'  pointing className='link item'>
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
                                            
                                            <Dropdown.Item><span  onClick = { () => setShowModal(true) }>Déconnexion</span></Dropdown.Item>
                                           
                                        </Dropdown.Menu>
                                    </Dropdown> */}
                                   
                                    {
                                        showModal == true ? (
                                            <Modal
                                            show={showModal}
                                            onHide={() => setShowModal(false)}
                                                size="lg"
                                                aria-labelledby="contained-modal-title-vcenter"
                                                centered
                                            >
                                                <Modal.Header closeButton>
                                                    <Modal.Title id="contained-modal-title-vcenter">
                                                        Déconnexion
                                                    </Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body>
                                                    <p>Etes vous sur de vouloir vous déconnecter ! </p>
                                                </Modal.Body>
                                                <Modal.Footer>
                                                    <Button variant="secondary" onClick={HandleLogout}>Oui</Button>
                                                    <Button onClick={() => setShowModal(false)} variant="light">Non</Button>
                                                </Modal.Footer>
                                            </Modal>
                                            
                                        ) : ''
                                    }
                                    
                                    <span className="logout-link contact-style" onClick = { () => setShowModal(true) }>Déconnexion</span>
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