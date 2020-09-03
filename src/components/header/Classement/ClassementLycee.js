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
<<<<<<< HEAD

                  let test = [];
                  let final_test = 0;

                  const reducer = (accumulator, currentValue) => accumulator + currentValue;

=======
                  let test = [];
                  let final_test = 0;
                  const reducer = (accumulator, currentValue) => accumulator + currentValue;
>>>>>>> 0cd7042b3db30d082ca0b21a2443e2d847a4c984
                    let object_final = []
                    let object ={}
                    snapshot.forEach(function(childSnapshot) {
                        // key will be "ada" the first time and "alan" the second time
                        let key = childSnapshot.key;
                        // childData will be the actual contents of the child
                        let childData = childSnapshot.val();
<<<<<<< HEAD

                        console.log(childData.etablissement)
                        if(childData.etablissement === `Centre d'Études forestières et agricoles`){
                          test.push(childData.points);
=======
                       // console.log(childData.etablissement)
                        if(childData.etablissement === `Centre d'Études forestières et agricoles`){
                          test.push(childData.points);
                          console.log()
>>>>>>> 0cd7042b3db30d082ca0b21a2443e2d847a4c984
                        }
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
<<<<<<< HEAD

                    console.log(object)

                      
                //userContext.get_user_informations(user_informations.val());                    
                }) 
=======
                    //console.log(test.reduce(reducer))
                //userContext.get_user_informations(user_informations.val());                   
                })
>>>>>>> 0cd7042b3db30d082ca0b21a2443e2d847a4c984
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