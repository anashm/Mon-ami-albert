import React,{useState,useContext} from 'react';
import QrReader from 'react-qr-reader'
import UserContext from '../../Context/UserContext/UserContext';
import { Button } from 'semantic-ui-react';
import {FirebaseContext} from '../../firebase';
import Header from '../../components/header/Header';
import './QRComponent.css';
import Modal from 'react-bootstrap/Modal';
import highfive from '../../images/highFive/HIGHFIVE.svg';

const QRComponent = () => {
    const userContext = useContext(UserContext)
    const firebase = useContext(FirebaseContext)

    const [showModal ,setShowModal] = useState(false)
    const [ModalBravo ,setModalBravo] = useState(false)
    const [points , setPoints] = useState(0)
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
                        setPoints(Number(resultat[1]))
                        setModalBravo(true)
                          //alert('Bravo! vous avez gagné des points');
                      })
                  } 
              }
              else{
                  reference.child(userId).update({
                    code_scanned : resultat[0],
                    points : Number(user_points) + Number(resultat[1])
                  }).then(() => {
                    userContext.update_user_points_anas(Number(user_points) + Number(resultat[1]));
                    setModalBravo(true)
                      //alert('Bravo! vous avez gagné des points');
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
      <>
      <Header />
        <div>
          <div className="container-titles-qr-component">
            <span className="title-scan-qr-components">Trouves et scan des QRCODES M.A.A</span>
            <span className="title-scan-qr-components">pour gagner des points</span>
          </div>
            
            <div className="container-qr-div">
              <QrReader
                delay={300}
                onError={handleError}
                onScan={handleScan}
                style={{ width: '100%' }}
                />
            </div>

            <div className="container-btn-comment-ca-marche">
                <Button onClick={()=>setShowModal(true)}>Comment ça marche</Button>
            </div>  
              
            {
              showModal ? 
                <Modal
                  show={showModal}
                  onHide={() => setShowModal(false)}
                      size="lg"
                      aria-labelledby="contained-modal-title-vcenter"
                      centered
                  >
                      <Modal.Header closeButton>
                          <Modal.Title id="contained-modal-title-vcenter">
                              <span>Comment ça Marche</span>
                          </Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                          <p>Texte Modal <br/>
                          
                          
                          </p>
                      </Modal.Body>
                      <Modal.Footer>
                          {/* <Button variant="secondary" id="okey-btn-model"   >Okey</Button> */}
                          <Button onClick={() => setShowModal(false)}  variant="light">Ok</Button>
                      </Modal.Footer>
                  </Modal>

                :

                ''
            }
            
            {
              showModal ? 
                <Modal
                  show={showModal}
                  onHide={() => setShowModal(false)}
                      size="lg"
                      aria-labelledby="contained-modal-title-vcenter"
                      centered
                  >
                      <Modal.Header closeButton>
                          <Modal.Title id="contained-modal-title-vcenter">
                              Bravo
                          </Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                          <div className="modal-container-bravo-points">
                            <span className="tu-as-ganer">Tu as gagner</span>
                            <div className="high_fives_container_modal">
                                 <span className="high_fives_span"> 
                                    <img src={highfive} className="high_fives_images" />
                                  </span>
                                <span className="numbers_high_five">
                                    {points}
                                </span>
                            
                            </div>
                          </div>
                      </Modal.Body>
                      <Modal.Footer>
                          {/* <Button variant="secondary" id="okey-btn-model"   >Okey</Button> */}
                          <Button onClick={() => setShowModal(false)}  variant="light">Fermer</Button>
                      </Modal.Footer>
                  </Modal>

                :

                ''
            }
        </div>

      </>
    )
}

export default QRComponent;
