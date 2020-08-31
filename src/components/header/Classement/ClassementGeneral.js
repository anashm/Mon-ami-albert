import React,{useEffect,useContext,useState} from 'react';
import {FirebaseContext} from '../../../firebase';
import UserContext from '../../../Context/UserContext/UserContext';
import { useHistory } from "react-router-dom";
import { Alert } from 'react-bootstrap';

const ClassementGeneral = () => {

    const firebase = useContext(FirebaseContext)
    const userContext = useContext(UserContext)

    const history = useHistory();

    const [ progression , setProgression ] = useState([])
   
    useEffect(() => {
       
        firebase.auth.onAuthStateChanged( user => {
          if(user){
              //code if realod page pour garder context api values
               userContext.get_connected_user(user);
               const userId = user.uid;                      
               const database = firebase.getData();
               const reference =  database.ref('users/'+userId)
      
                reference.once("value", user_informations => {
                userContext.get_user_informations(user_informations.val());

                    setProgression(user_informations.val().Progression.Seconde.Mathematique)
                     const collection = user_informations.val().Progression             
                     console.log(collection)
                }) 
                     
          }
          else{

           console.log('not login');
           history.push('/')
          }
        });
  
      }, []);

    return (
        <div>
            <p>this is classement général</p>
            <ul>
               
               
                {/* {progression ? progression.map( (progress , index) => {
                    return (
                        <li key={index}> {progress} </li>
                    )
                    
                }) : '' } */}
            </ul>
        </div>
    )
}

export default ClassementGeneral;
