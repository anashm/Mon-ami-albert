import React from 'react'
import FirstDiv from './Firstdiv';
import SecondDiv from './Seconddiv';
import ThirdDiv from './Thirddiv';
import FourthDiv from './Fourthdiv';
import Fifthdiv from './Fifthdiv';
import Sixthdiv from './Sixthdiv';
import Seventhdiv from './Seventhdiv';
import Lastdiv from './Lastdiv';

import { useContext, useEffect } from 'react';
import UserContext from '../../../Context/UserContext/UserContext';
import firebase from 'firebase';


export default function HomePage(props) {

    const userContext = useContext(UserContext);

    //console.log(userContext);

    useEffect(() => {

        firebase.auth().onAuthStateChanged( user => {
            if(user){
              console.log(user);
              userContext.get_connected_user(user);
            }else{
              console.log('not logged in')
            }
          });

       //const user = userContext.get_connected_user();
    //   console.log(user)
    },[])



    

    return (
        <>
                { console.log(userContext) }
            <FirstDiv user={props} />
            <SecondDiv />
            <ThirdDiv /> 
            <FourthDiv />
            <Fifthdiv />
            <Sixthdiv />
            <Seventhdiv /> 
            <Lastdiv />
        </>
    )
}
