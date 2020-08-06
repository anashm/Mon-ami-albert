import React,{useState,useEffect,useContext} from 'react';
import './Header.css';
import logo from '../../images/MON_AMIALBERT2.svg';
import { FaPhoneAlt  } from 'react-icons/fa'
import {Link} from 'react-router-dom';
import {FirebaseContext} from '../../firebase'
import UserContext from '../../Context/UserContext/UserContext';

export default function Header() {

    const userContext = useContext(UserContext);
    const firebase = useContext(FirebaseContext)

    const connectedUser = userContext.user;
    const [logout , setLogout] =useState(false);

    const HandleLogout = () => {
        setLogout(true)
    }

    useEffect( () => {
        if(logout){
            firebase.signOutUser()
            console.log('deconnexion')
        }
    }, [logout])


    return (  
        <header>   
            <div className="container" style={{marginTop:'20px'}}>
                <div className="row">
                    <div className="logo col-md-2" style={{color:'#636363'}}>
                        <Link to="/"> <img src={logo} style={{width:'70%'}} /> </Link>
                        
                    </div>
                    <div className="col-md-6">

                    </div>
                    <div className="col-md-2">
                        <span className="phone_number"> <FaPhoneAlt  /> &nbsp;&nbsp; 05 22 33 44 55</span>
                    </div>
                    <div className="col-md-2">
                        
                        {
                            connectedUser ? <span className="contact" onClick={HandleLogout}>Déconnexion</span>  :  <span className="contact">Contact</span>
                        }
                        
                    </div>
                </div>
            </div>
        </header>  
    )
}
