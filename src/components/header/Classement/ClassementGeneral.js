import React,{useEffect,useContext,useState} from 'react';
import {FirebaseContext} from '../../../firebase';
import UserContext from '../../../Context/UserContext/UserContext';
import { useHistory } from "react-router-dom";
import {  Table } from 'semantic-ui-react'
import './ClassementGeneral.css';
import { Dimmer, Loader } from 'semantic-ui-react';
import highfive from '../../../images/highFive/HIGHFIVE.svg';
import Header from '../../header/Header';
import { Tab,Tabs } from 'react-bootstrap';

const ClassementGeneral = () => {

    const firebase = useContext(FirebaseContext);
    const userContext = useContext(UserContext);
    const history = useHistory();

    const [ classement , setClassement ] = useState([]);
    const [dimmer , setDimmer ] = useState(true);
    const [level , setLevel] = useState('');

    const[eleveMaroc,setEleveMaroc] = useState([])
    const[eleveFrance,setEleveFrance] = useState([])
    useEffect(() => {
        if(userContext.user && userContext.user_informations){
            //code if realod page pour garder context api values
            //const userId = userContext.user.uid;                      
            const database = firebase.getData();
            //const reference_user = database.ref('users/'+userId);
            /*  reference_user.once("value", user_informations => {
                userContext.get_user_informations(user_informations.val()); */
                let resultat_pays ={}  
            const reference =  database.ref('users');
            reference.once("value", snapshot => {
                let object_final_maroc = []
                let object_final_france = [];
                

                snapshot.forEach(function(childSnapshot) {
                  
                    const childData = childSnapshot.val();
                   
                    setLevel(userContext.user_informations.level)

                    if(childData.points && childData.pays)
                    if(childData.level === userContext.user_informations.level && childData.pays.toLowerCase() === 'ma')
                    object_final_maroc = [
                        ...object_final_maroc,
                        {
                            points : childData.points,
                            firstName : childData.firstName,
                            lastName : childData.lastName,
                            etablissement : childData.etablissement
                            
                        }
                    ]

                    if(childData.points && childData.pays)
                    if(childData.level === userContext.user_informations.level && childData.pays.toLowerCase() === 'fr')
                    object_final_france = [
                        ...object_final_france,
                        {
                            points : childData.points,
                            firstName : childData.firstName,
                            lastName : childData.lastName,
                            etablissement : childData.etablissement
                            
                        }
                    ]
                    
                      object_final_maroc.sort((a, b) => b.points - a.points );
                      object_final_france.sort((a, b) => b.points - a.points );
                    //setClassement(object_final)
                });
                resultat_pays = {
                    maroc : object_final_maroc,
                    france : object_final_france
                  }
                 
            }).then( () => {
                console.log('done');
                setDimmer(false);
                return new Promise(function(resolve,reject){
                    if(resultat_pays.maroc || resultat_pays.france){
                      resolve(resultat_pays)
                    }
                    else 
                      reject('Il y a aucun lycée')
                  })
               
            }).then((data)=>{
                setEleveFrance(data.france)
                setEleveMaroc(data.maroc)
                console.log(data)
            }).catch(e => {
                console.log(e);
                history.push('/404');
            });
                
                
        }
    }, [userContext.user_informations , userContext.user]);

    return (

        <div className = 'general-order-container'>


            <h3>Classement Général { level ? level : ''} </h3> 

            
            <Tabs defaultActiveKey="Lycées du Maroc" id="uncontrolled-tab-example">
                <Tab eventKey="Lycées de France" title="Lycées de France">
                    

                <Table unstackable>
                        <Table.Body>

                    {
                        eleveFrance ? 
                        eleveFrance.map( (user , index) => {
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


                </Tab>
                <Tab eventKey="Lycées du Maroc" title="Lycées du Maroc">


                        <Table unstackable>
                        <Table.Body>

                    {
                        eleveMaroc ? 
                        eleveMaroc.map( (user , index) => {
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


                </Tab>
               
            </Tabs>

           
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
