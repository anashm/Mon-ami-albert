import React,{useState,useEffect} from 'react'
import { app } from 'firebase';


export const AuthContext = React.createContext();

export const LoginProvider = props  => {

   // const[currentUser,setCurrentUser] = useState(null);

  /*  useEffect(() => {
     auth.onAuthStateChanged(userAuth => {
        this.setState({ user: userAuth});
      });

   }, []); */

    return (
       <AuthContext.Provider value={"hello"}>
           {props.children}
       </AuthContext.Provider> 
    )
}


