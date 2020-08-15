import React,{useState,useEffect,useContext} from 'react'
import { app } from 'firebase';
import {FirebaseContext} from '../../firebase'

export const LoggedinContext = React.createContext();

export const LoggedinProvider = props  => {

    const firebase = useContext(FirebaseContext)

    const[loggenIn,setloggenIn] = useState(null);

   useEffect(() => {
      
        firebase.auth.onAuthStateChanged( user => {
            user ?  setloggenIn(user) :  setloggenIn(null);
         });
    
         

   }, []);

    return (
       <LoggedinContext.Provider value={loggenIn}>
           {props.children}
       </LoggedinContext.Provider> 
    )
}


