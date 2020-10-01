import React,{useState,useContext} from 'react';
import QrReader from 'react-qr-reader'
import UserContext from '../../Context/UserContext/UserContext';
import { Button } from 'semantic-ui-react';
import {FirebaseContext} from '../../firebase';

const QRComponent = () => {
    const userContext = useContext(UserContext)
    const firebase = useContext(FirebaseContext)


    const[idCode,setIdCode] = useState('');
    const[nbrPoints,setNbrPoint] = useState(0);
    const[showScanner , setShowScanner] = useState(false);

   
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
            setIdCode(resultat[0]);
            setNbrPoint(resultat[1]);

            if(userContext.user_informations.code_scanned){
              alert('dkhal hna')
                if(userContext.user_informations.code_scanned === resultat[0]){
                    alert('tas déja reçu les points')
                }
                else{
                    reference.child(userId).update({
                      code_scanned : resultat[0],
                      points : Number(user_points) + Number(resultat[1])
                    }).then(() => {
                      userContext.update_user_points_anas(Number(user_points) + Number(resultat[1]));
                        alert('succes');
                    })
                }
                
            }
            else{
                reference.child(userId).update({
                  code_scanned : resultat[0],
                  points : Number(user_points) + Number(resultat[1])
                }).then(() => {
                  userContext.update_user_points_anas(Number(user_points) + Number(resultat[1]));
                    alert('succes');
                })
            }
            
            
              
    
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
    const HandleShowScanner = () => {
      setShowScanner(true);
    }
    return (
        <div>
          <Button onClick={HandleShowScanner}  >Scanner</Button>
          {/* <Button onClick={HandleTest}  >Test</Button> */}
          {
            showScanner ? 
              <QrReader
                delay={300}
                onError={handleError}
                onScan={handleScan}
                style={{ width: '100%' }}
                />
                :
                ''
          }
            
            <p>{idCode}</p>            
            <p>{nbrPoints}</p>
            
        </div>
    )
}

export default QRComponent;
