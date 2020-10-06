import React,{useState,useContext} from 'react';
import QrReader from 'react-qr-reader'
import UserContext from '../../Context/UserContext/UserContext';
import { Button } from 'semantic-ui-react';
import {FirebaseContext} from '../../firebase';

const QRComponent = () => {
    const userContext = useContext(UserContext)
    const firebase = useContext(FirebaseContext)


    /* const[idCode,setIdCode] = useState('');
    const[nbrPoints,setNbrPoint] = useState(0); */
   

   
   /*  const HandleTest = () => {

      if(userContext.user){
        const user =  userContext.user; 
        const userId = user.uid;  
        
        const database = firebase.getData();
        const reference =  database.ref('users/')
        const user_points = userContext.user_informations.points
        console.log(Number(user_points) + Number('30'))
        
            

      }
    } */

    const handleScan = data => {
      
        if (data) {
          if(userContext.user){
            const user =  userContext.user; 
            const userId = user.uid;  
            
            const database = firebase.getData();
            const reference =  database.ref('users/')
            const user_points = userContext.user_informations.points

            let resultat = data.split('###');
            /* setIdCode(resultat[0]);
            setNbrPoint(resultat[1]); */

            const reference_user =  database.ref(`users/${userId}`)
            reference_user.once("value", user_informations => {
              if(user_informations.val().code_scanned){
                  if(user_informations.val().code_scanned === resultat[0]){
                    alert('vous avez déja reçu les points')
                  }
                  else{
                      reference.child(userId).update({
                        code_scanned : resultat[0],
                        points : Number(user_points) + Number(resultat[1])
                      }).then(() => {
                        userContext.update_user_points_anas(Number(user_points) + Number(resultat[1]));
                          alert('Bravo! vous avez gagné des points');
                      })
                  } 
              }
              else{
                  reference.child(userId).update({
                    code_scanned : resultat[0],
                    points : Number(user_points) + Number(resultat[1])
                  }).then(() => {
                    userContext.update_user_points_anas(Number(user_points) + Number(resultat[1]));
                      alert('Bravo! vous avez gagné des points');
                  })
              }
               
            });
            
           
            
            
              
    
          }
          else{
            alert('vous devez vous connectez dabord !')
          }
            


         // }
        
          
        }
      }
    const handleError = err => {
        console.error(err)
     
      }
   
    return (
        <div>
         
        
              <QrReader
                delay={300}
                onError={handleError}
                onScan={handleScan}
                style={{ width: '100%' }}
                />
              
            
            
            
        </div>
    )
}

export default QRComponent;
