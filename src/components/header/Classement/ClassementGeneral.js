import React,{useEffect,useContext,useState} from 'react';
import {FirebaseContext} from '../../../firebase';
import UserContext from '../../../Context/UserContext/UserContext';
import { useHistory } from "react-router-dom";
import { Alert } from 'react-bootstrap';
import { Icon, Table } from 'semantic-ui-react'
import './ClassementGeneral.css';

const ClassementGeneral = () => {

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
                        
                        /* object = {
                            ...object,
                        }
                        if(typeof(object [`${childData.etablissement}`]) === NaN){
                            object [`${childData.etablissement}`] =0
                            object [`${childData.etablissement}`] = object [`${childData.etablissement}`] + childData.points
                            console.log(object)
                        } */
                        
                        
                        if(childData.points)
                        object_final = [
                            ...object_final,
                            {
                                points : childData.points,
                                firstName : childData.firstName,
                                lastName : childData.lastName,
                                etablissement : childData.etablissement
                                
                            }
                            
                        ]

                        
                        //console.log(childData)
                        object_final.sort(function(a, b) {
                            return b.points - a.points;
                          });
                          setClassement(object_final)
                          console.log(object_final);
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
        <div className = 'login-content-container'>
            <p>this is classement générals</p>
            <Table>
                <Table.Body>
               {/*  <Table.Row>
                    <Table.Cell collapsing>
                   
                    node_modules
                    </Table.Cell>
                    <Table.Cell>Initial commit</Table.Cell>
                    <Table.Cell>10 hours ago</Table.Cell>
                </Table.Row> */}
                
                
                
               
               {
                   classement ? 
                   classement.map( (user , index) => {
                    return (
                        <Table.Row>
                            <Table.Cell>{index+1}</Table.Cell>
                            
                            
                            <Table.Cell><span className="identifiants-classement-user"> {user.lastName} {user.firstName} </span><br></br>
                            <span> {user.etablissement} </span>
                            </Table.Cell>
                            <Table.Cell  key={index}>
                            <div>
                                <span className="high_fives_span"> {user.points}</span> 
                                <span > High Fives </span>
                            </div>
                            
                            </Table.Cell>
                        </Table.Row>
                        
                    )
                   

                   }) : ''
               }
               
               </Table.Body>
            </Table>
            
        </div>
    )
}

export default ClassementGeneral;
