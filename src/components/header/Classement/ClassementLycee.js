import React,{useEffect,useContext,useState} from 'react';
import {FirebaseContext} from '../../../firebase';
import UserContext from '../../../Context/UserContext/UserContext';
import { useHistory } from "react-router-dom";
import { Alert } from 'react-bootstrap';

const ClassementLycee = () => {

    const firebase = useContext(FirebaseContext)
    const userContext = useContext(UserContext)

    const history = useHistory();

    const [ progression , setProgression ] = useState([])
    const [ classement , setClassement ] = useState([])
   
    useEffect(() => {
       
        firebase.auth.onAuthStateChanged( user => {
          if(user){

          
              //code if realod page pour garder context api values
               userContext.get_connected_user(user);
               const userId = user.uid;                      
               const database = firebase.getData();
               const reference =  database.ref('users')
              
            
              //const mostViewedPosts = database.ref('users/'+userId).orderByChild('/points');
              

              /* mostViewedPosts.once("value", user_informations => {

                console.log(user_informations.val())
              }) */
            
                reference.once("value", snapshot => {

                    let object_final = []
                    let object ={}
                    snapshot.forEach(function(childSnapshot) {
                        // key will be "ada" the first time and "alan" the second time
                        var key = childSnapshot.key;
                        // childData will be the actual contents of the child
                        var childData = childSnapshot.val();
                        
                        //console.log(childData)
                        
                        
                        /* if(typeof(object [`${childData.etablissement}`]) === NaN){
                            object [`${childData.etablissement}`] =0
                        } */
                            object[`${childData.etablissement}`] = object[`${childData.etablissement}`] + childData.points
                                if(childData.etablissement)
                                console.log(childData.etablissement)
                        
                        
                        
                        
                      });
                     
                //userContext.get_user_informations(user_informations.val());
               
                    
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
            <p>this is classement lycée</p>
            
        </div>
    )
}

export default ClassementLycee;
