import React,{useEffect,useContext,useState} from 'react';
import {FirebaseContext} from '../../../firebase';
import UserContext from '../../../Context/UserContext/UserContext';
import { useHistory } from "react-router-dom";
import {  Table } from 'semantic-ui-react';
import { Dimmer, Loader } from 'semantic-ui-react';
import highfive from '../../../images/highFive/HIGHFIVE.svg';

import './ClassementGeneral.css';

const ClassementLycee = () => {
    const firebase = useContext(FirebaseContext);
    const userContext = useContext(UserContext);
    const history = useHistory();
    const [ classement , setClassement ] = useState([]);
    const [dimmer , setDimmer ] = useState(true);


    useEffect(() => {

        if(userContext.user){
          const database = firebase.getData();
          const reference =  database.ref('users');
          //const mostViewedPosts = database.ref('users/'+userId).orderByChild('/points');
          /* mostViewedPosts.once("value", user_informations => {
            console.log(user_informations.val())
          }) */
            reference.once("value", snapshot => {
              //const reducer = (accumulator, currentValue) => accumulator + currentValue;
              let object ={}
              snapshot.forEach(function(childSnapshot) {
                // key will be "ada" the first time and "alan" the second time
                // childData will be the actual contents of the child
                let childData = childSnapshot.val();
                //console.log(childData.etablissement)
              
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
              });

              let sorted = Object.entries(object).sort((a, b) => b[1] - a[1]);
              setClassement(sorted);
              //console.log(sorted)
              //userContext.get_user_informations(user_informations.val());                   
            }).then( () => {
                setDimmer(false);
            }).catch(e => {
              console.log(e);
              history.push('/404');
            });
          }
          
      }, [userContext.user]);

    return (
        <div className = 'general-order-container'>
            <center> <h3>Classement lycée</h3> </center>
            
            <Table unstackable>
                <Table.Body>
            {
                classement ? 
                classement.map( ( lycee,index) => {
                    return (
                        <Table.Row key = {index}>
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