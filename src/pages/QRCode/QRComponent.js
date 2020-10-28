import React,{useState,useContext} from 'react';
import QrReader from 'react-qr-reader'
import UserContext from '../../Context/UserContext/UserContext';

import {FirebaseContext} from '../../firebase';
import Header from '../../components/header/Header';
import './QRComponent.css';
import Modal from 'react-bootstrap/Modal';
import highfive from '../../images/highFive/HIGHFIVE.svg';
import {Form,Button} from 'semantic-ui-react';

const QRComponent = () => {
    const userContext = useContext(UserContext)
    const firebase = useContext(FirebaseContext)

    const [showModal ,setShowModal] = useState(false)
    const [ModalBravo ,setModalBravo] = useState(false)
    const [points , setPoints] = useState(0)
    const [showCodeInput , setShowCodeInput] = useState(false);
    const [codePromo , setCodePromo] = useState('')
    /* const[idCode,setIdCode] = useState('');
    const[nbrPoints,setNbrPoint] = useState(0); */
   

   
   

    const HandleCodeManuel = () => {
      setShowCodeInput(true)
    }

    const ValiderCodeInput = () => {
      var existence = 0;
      var object_promotionnel = {};
      if(userContext.user){
        const user =  userContext.user; 
        const userId = user.uid;  
        
        const database = firebase.getData();
        const reference =  database.ref('qr-code/all/')


        reference.once("value", codes => {
          var element_object = codes.val()
         
          element_object.forEach(element => {
            
            if(element.code === codePromo){
              existence = 1;
              object_promotionnel.code = element.code
              object_promotionnel.points = element.points
              
            }
            
              
          })

        }).then(()=>{
          if(existence == 1){

            const userId = user.uid; 
            const reference_user =  database.ref(`users/${userId}`)
            const reference_update =  database.ref('users/')
            const user_points = userContext.user_informations.points
            reference_user.once("value", user_informations => {
              if(user_informations.val().code_scanned){
                  if(user_informations.val().code_scanned === object_promotionnel.code){
                    alert('Tu as déja reçu les points')
                  }
                  else{
                    reference_update.child(userId).update({
                        code_scanned : object_promotionnel.code,
                        points : Number(user_points) + Number(object_promotionnel.points)
                      }).then(() => {
                        userContext.update_user_points_anas(Number(user_points) + Number(object_promotionnel.points));
                        setPoints(Number(object_promotionnel.points))
                        setModalBravo(true)
                          //alert('Bravo! vous avez gagné des points');
                      })
                  } 
              }
              else{
                  reference_update.child(userId).update({
                    code_scanned : object_promotionnel.code,
                    points : Number(user_points) + Number(object_promotionnel.points)
                  }).then(() => {
                    userContext.update_user_points_anas(Number(user_points) + Number(object_promotionnel.points));
                    setModalBravo(true)
                      //alert('Bravo! vous avez gagné des points');
                  })
              }
               
            });


          }

          else{
            alert('Le code est erroné')
          }
          
        })
      }
      
    }

    const HandleChangeCodePromo = (e) =>{
      setCodePromo(e.target.value)
    }

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
                    alert('Tu as déja reçu les points')
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
            alert('Connectes-toi dabord !')
          }
            


         // }
        
          
        }
      }
    const handleError = err => {
        console.error(err)
        
      }
   
    return (
   
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
                <Button onClick={()=>setShowModal(true)} id="comment-ca-marche">Comment ça marche</Button>
            </div>  
            <div className="container-souci-camera">
              <p className = 'subscribe-text text-center'> <span> Un soucis avec la Camera ? </span>  <small className = 'entrer-qr-code-manuellement' onClick={HandleCodeManuel}>  Entre ton code manuellement! </small> </p>  
            </div>   
              {
                showCodeInput ? 
                <div className="subscribe-text text-center promo">
                  <Form.Field>
                    
                    <label>Code &nbsp;&nbsp;&nbsp;</label>
                    
                    <input type="text" onChange={HandleChangeCodePromo} placeholder='Entrer le Code' />
                  </Form.Field>
                  <div className="container-btn-entrer-code">
                      <Button  onClick={ValiderCodeInput} id="comment-ca-marche">Entrer Code</Button>
                  </div>
                  
                </div>
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
              ModalBravo ? 
                <Modal
                  show={ModalBravo}
                  onHide={() => setModalBravo(false)}
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
                          <Button onClick={() => setModalBravo(false)}  variant="light">Fermer</Button>
                      </Modal.Footer>
                  </Modal>

                :

                ''
            }
        </div>

    )
}

export default QRComponent;
