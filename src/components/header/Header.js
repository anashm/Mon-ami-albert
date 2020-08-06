import React,{useState,useEffect,useContext} from 'react';
import './Header.css';
import logo from '../../images/MON_AMIALBERT2.svg';
import { FaPhoneAlt  } from 'react-icons/fa'
import {Link} from 'react-router-dom';
import {FirebaseContext} from '../../firebase'


export default function Header() {
   
    const firebase = useContext(FirebaseContext)

    const [logout , setLogout] = useState(false);

    const HandleLogout = () => {
        setLogout(true);
    }

    useEffect( () => {
        if(logout){
            firebase.signOutUser()
            console.log('deconnexion');
        }
    }, [logout])


    return (  
        <header>   
            <div className="container">

                <div className="row">
                    <div className="logo col-md-2" style={{color:'#636363'}}>
                        <Link to="/"> <img src={logo} style={{width:'70%'}} alt = '' /> </Link>
                        
                    </div>
                    <div className="col-md-2">
                        <span className="phone_number"> <FaPhoneAlt  /> &nbsp;&nbsp; 05 22 33 44 55</span>
                    </div>
                    <div className="col-md-2">
                        <span className="contact">Contact</span>
                        <span onClick={HandleLogout}>Déconnexion</span>
                    </div>
                </div>
            </div>
        </header>  
    )
}
