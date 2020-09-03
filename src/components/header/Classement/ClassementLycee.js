import React,{useEffect,useContext,useState} from 'react';
import {FirebaseContext} from '../../../firebase';
import UserContext from '../../../Context/UserContext/UserContext';
import { useHistory } from "react-router-dom";
import {  Table } from 'semantic-ui-react';
import { Dimmer, Loader } from 'semantic-ui-react';
import highfive from '../../../images/highFive/HIGHFIVE.svg';

import './ClassementGeneral.css'

const ClassementLycee = () => {
    const firebase = useContext(FirebaseContext)
    const userContext = useContext(UserContext)
    const history = useHistory();
    const [ progression , setProgression ] = useState([])
    const [ classement , setClassement ] = useState([])
    const [dimmer , setDimmer ] = useState(true)


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
                  let test = [];
                  let final_test = 0;
                  const reducer = (accumulator, currentValue) => accumulator + currentValue;
                    let object_final = []
                    let object ={}
                    snapshot.forEach(function(childSnapshot) {
                        // key will be "ada" the first time and "alan" the second time
                        let key = childSnapshot.key;
                        // childData will be the actual contents of the child
                        let childData = childSnapshot.val();
                       console.log(childData.etablissement)
                        /* if(childData.etablissement === `Lycée Jaber Ben Hayan`){
                          test.push(childData.points);
                          console.log(childData)
                        } */
                        //console.log(childData)
                        if(childData.etablissement){
                          if(isNaN(object[`${childData.etablissement}`])){
                            object = {
                              ...object,
                            }
                            //console.log(childData.points)
                            object[`${childData.etablissement}`] = childData.points;
                          }else{
                            //console.log(childData.points)
                            object[`${childData.etablissement}`] = object[`${childData.etablissement}`] + childData.points
                          }
                        }
                        /* if(typeof(object [`${childData.etablissement}`]) === NaN){
                            object [`${childData.etablissement}`] =0
                        } */
                    });

                    /* object.sort(function(a, b) {
                        return b.points - a.points;
                      }); */
                      let entries = Object.entries(object);
                      let sorted = entries.sort((a, b) => b[1] - a[1]);
                      setClassement(sorted)
                      console.log(sorted)
                  
                //userContext.get_user_informations(user_informations.val());                   
                }).then( () => {
                 
                    setDimmer(false)
                }) 
          }
          else{
            console.log('not login');
            history.push('/')
          }
        });
      }, []);
    return (
        <div className = 'general-order-container'>
            <center> <h3>Classement lycée</h3> </center>
            
            <Table>
                <Table.Body>
            {
                classement ? 
                classement.map( ( lycee,index) => {
                    return (
                        <Table.Row>
                        <Table.Cell>
                          <span className="index_style_classement"> {index+1}</span>

                        </Table.Cell>
                        
                        <Table.Cell>
                        <span className="identifiants-classement-user">
                        {lycee[0]} 
                        </span>
                        
                          
                        </Table.Cell>
                        <Table.Cell>
                        <div className="high_fives_container">
                                 <span className="high_fives_span"> 
                                    <img src={highfive} className="high_fives_images" />
                                </span>
                            <span className="numbers_high_five">
                                {lycee[1]} 
                            </span>
                            
                        </div>
                        </Table.Cell>
                    </Table.Row>
                    )   
                }) : ''
            }
            </Table.Body>
            </Table>

            {
              dimmer ? <div className="loader-container" style = {{ height: '30vh' }}>
              (<Dimmer active inverted>
                  <Loader inverted content='Chargement en cours...' />
              </Dimmer>) 
                              
          </div> : ''
            }
            
        </div>
    )
}
export default ClassementLycee;