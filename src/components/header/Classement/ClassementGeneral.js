import React,{useEffect,useContext,useState} from 'react';
import {FirebaseContext} from '../../../firebase';
import UserContext from '../../../Context/UserContext/UserContext';
import { useHistory } from "react-router-dom";
import {  Table } from 'semantic-ui-react'
import './ClassementGeneral.css';
import { Dimmer, Loader } from 'semantic-ui-react';
import highfive from '../../../images/highFive/HIGHFIVE.svg';
import Header from '../../header/Header';

const ClassementGeneral = () => {

    const firebase = useContext(FirebaseContext);
    const userContext = useContext(UserContext);
    const history = useHistory();

    const [ classement , setClassement ] = useState([]);
    const [dimmer , setDimmer ] = useState(true);
    const [level , setLevel] = useState('');

    useEffect(() => {
        if(userContext.user && userContext.user_informations){
            //code if realod page pour garder context api values
            //const userId = userContext.user.uid;                      
            const database = firebase.getData();
            //const reference_user = database.ref('users/'+userId);
            /*  reference_user.once("value", user_informations => {
                userContext.get_user_informations(user_informations.val()); */
                
            const reference =  database.ref('users');
            reference.once("value", snapshot => {
                let object_final = []
                
                snapshot.forEach(function(childSnapshot) {
                  
                    const childData = childSnapshot.val();
                   
                    setLevel(userContext.user_informations.level)

                    if(childData.points)
                    if(childData.level === userContext.user_informations.level)
                    object_final = [
                        ...object_final,
                        {
                            points : childData.points,
                            firstName : childData.firstName,
                            lastName : childData.lastName,
                            etablissement : childData.etablissement
                            
                        }
                    ]

                    object_final.sort((a, b) => b.points - a.points );
                    setClassement(object_final)
                });
            }).then( () => {
                console.log('done');
                setDimmer(false);
            }).catch(e => {
                console.log(e);
                history.push('/404');
            });
                
                
        }
    }, [userContext.user_informations , userContext.user]);

    return (

        <div className = 'general-order-container'>


            <h3>Classement Général { level ? level : ''} </h3> 

            

            <Table unstackable>
                <Table.Body>

               {
                   classement ? 
                   classement.map( (user , index) => {
                    return (
                        <Table.Row key = {index}>
                            <Table.Cell>
                                <span className="index_style_classement">
                                {index+1}
                                </span>
                            </Table.Cell>
                            
                            
                            <Table.Cell><span className="identifiants-classement-user"> {user.lastName} {user.firstName} </span><br></br>
                            <span> {user.etablissement} </span>
                            </Table.Cell>
                            <Table.Cell  key={index}>
                            <div className="high_fives_container">
                                <span className="high_fives_span"> 
                                    <img src={highfive} className="high_fives_images" alt = '' />
                                 </span>
                                <span className="numbers_high_five"> {user.points}</span> 
                                
                            </div>
                            
                            </Table.Cell>
                        </Table.Row>
                        
                    )
                   

                   }) : ''
               }
               
               </Table.Body>
            </Table>
            <div className="loader-container" style = {{ height: '30vh' }}>
                {dimmer ? (<Dimmer active inverted>
                    <Loader inverted content='Chargement en cours...' />
                </Dimmer>) :  
                    ''
                }
                                
            </div>
        </div>

    )
}

export default ClassementGeneral;
