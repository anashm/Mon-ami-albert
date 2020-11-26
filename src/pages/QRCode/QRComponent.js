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
    const [TuasDejaPoints ,setTuasDejaPoints] = useState(false)
    const [points , setPoints] = useState(0)
    const [showCodeInput , setShowCodeInput] = useState(false);
    const [showModalDateExpiree , setShowModalDateExpiree] = useState(false)
    const [codePromo , setCodePromo] = useState('')
    const [textModal,setTextModal] = useState('')
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
              object_promotionnel.date_expiration = element.date_expiration
              object_promotionnel.deleted = element.deleted
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
                    setTuasDejaPoints(true)
                    //alert('Tu as déja reçu les points')
                  }
                  else{

                    var split = object_promotionnel.date_expiration.split('/');
                    var date = new Date(split[2], split[1] - 1, split[0]); //Y M D 
                    var timestamp = date.getTime();
                    if(timestamp > Date.now() && object_promotionnel.deleted !== 1 && object_promotionnel.disabled !=1){
                      
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
                    else{
                      setShowModalDateExpiree(true)
                      setTextModal('le code est expiré')
                    }

                    
                  } 
              }
              else{
                
                var split = object_promotionnel.date_expiration.split('/');
                    var date = new Date(split[2], split[1] - 1, split[0]); //Y M D 
                    var timestamp = date.getTime();
                    if(timestamp > Date.now() && object_promotionnel.deleted != 1 && object_promotionnel.disabled !=1){
                      
                      reference_update.child(userId).update({
                        code_scanned : object_promotionnel.code,
                        points : Number(user_points) + Number(object_promotionnel.points)
                      }).then(() => {
                        userContext.update_user_points_anas(Number(user_points) + Number(object_promotionnel.points));
                        setModalBravo(true)
                          //alert('Bravo! vous avez gagné des points');
                      })
                    }
                    else{
                      setShowModalDateExpiree(true)
                      setTextModal('le code est expiré')
                      
                    }
                  
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
            

            const reference_user =  database.ref(`users/${userId}`)
            reference_user.once("value", user_informations => {
              // code non existant dans la collection users
              if(user_informations.val().code_scanned){
                  if(user_informations.val().code_scanned === resultat[0]){
                    setTuasDejaPoints(true)
                    //alert('Tu as déja reçu les points')
                  }
                  else{

                    //test sur la collection qr code validité du code
                    const reference_code = database.ref("qr-code/all")
                    reference_code.once("value", snapshot => {

                      snapshot.forEach(element => {
                        if(element.val().code === resultat[0]){

                          var split = element.val().date_expiration.split('/');
                          var date = new Date(split[2], split[1] - 1, split[0]); //Y M D 
                          var timestamp = date.getTime();
                          if(timestamp > Date.now() && element.val().disabled !=1 && element.val().deleted !=1){
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
                          else{
                            setShowModalDateExpiree(true)
                            setTextModal('le code est expiré')
                          }

                        }
                      });
                    })

                     
                  } 
              }
              else{


                const reference_code = database.ref("qr-code/all")
                reference_code.once("value", snapshot => {

                  snapshot.forEach(element => {
                    if(element.val().code === resultat[0]){

                      var split = element.val().date_expiration.split('/');
                          var date = new Date(split[2], split[1] - 1, split[0]); //Y M D 
                          var timestamp = date.getTime();
                          if(timestamp > Date.now() && element.val().disabled !=1 && element.val().deleted !=1 ){
                              reference.child(userId).update({
                                code_scanned : resultat[0],
                                points : Number(user_points) + Number(resultat[1])
                              }).then(() => {
                                userContext.update_user_points_anas(Number(user_points) + Number(resultat[1]));
                                setModalBravo(true)
                                  //alert('Bravo! vous avez gagné des points');
                              })
                          }
                          else{
                            setShowModalDateExpiree(true)
                            setTextModal('le code est expiré')
                          }

                    }
                   

                  })

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
                 
                
                  <div className="ui form" style ={{maxWidth:'300px',margin:'auto'}}>

                    <div className="field" style={{display:'flex',alignItems:'center'}}>
                      
                      <label style={{marginRight:'15px'}}>Code</label>
                    
                      <input type="text" onChange={HandleChangeCodePromo} placeholder='Entrer le Code' />
                    </div>
                  </div>
                  <div className="container-btn-entrer-code">
                      <Button  onClick={ValiderCodeInput} id="comment-ca-marche">Valider Code</Button>
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
                              
                          </Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                          <div className="modal-container-bravo-points">
                            <span className="tu-as-ganer">Tu as gagné</span>
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

            {
              TuasDejaPoints ? 
                <Modal
                  show={TuasDejaPoints}
                  onHide={() => setTuasDejaPoints(false)}
                      size="lg"
                      aria-labelledby="contained-modal-title-vcenter"
                      centered
                  >
                      <Modal.Header closeButton>
                          <Modal.Title id="contained-modal-title-vcenter">
                              
                          </Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                          <p>Tu as déja utilisé ce QRcode</p>
                      </Modal.Body>
                      <Modal.Footer>
                          {/* <Button variant="secondary" id="okey-btn-model"   >Okey</Button> */}
                          <Button onClick={() => setTuasDejaPoints(false)}  variant="light">Fermer</Button>
                      </Modal.Footer>
                  </Modal>

                :

                ''
            }

            {
              showModalDateExpiree ? 
              <Modal
                show={showModalDateExpiree}
                onHide={() => setShowModalDateExpiree(false)}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p> {textModal} </p>
                    </Modal.Body>
                    <Modal.Footer>
                        {/* <Button variant="secondary" id="okey-btn-model"   >Okey</Button> */}
                        <Button onClick={() => setShowModalDateExpiree(false)}  variant="light">Fermer</Button>
                    </Modal.Footer>
                </Modal>

              :

              ''
            }
        </div>

    )
}

export default QRComponent;
