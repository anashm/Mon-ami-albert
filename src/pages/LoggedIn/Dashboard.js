import React, { Component,useState,useContext,useEffect } from 'react'
import MatiereComponent from './Matieres/MatiereComponent';
import './style/Dashboard.css';
import LogoMath from '../../images/Logo-math.png';
import LogoPhysique from '../../images/logo-physique.png';
import LogoAnglais from '../../images/logo-anglais.png';
import LogoGeo from '../../images/logo-geo.png';
import LogoPhilo from '../../images/logo-philo.png';
import LogoSVT from '../../images/logo-svt.png';
import LogoIng from '../../images/logo-ing.png';
import LogoJeux from '../../images/logo-jeux.png';
import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import { useHistory , Redirect } from "react-router-dom";
import {FirebaseContext} from '../../firebase';
import UserContext from '../../Context/UserContext/UserContext';
import NiveauxSchool from './Matieres/NiveauxSchoolComponent'



const  Dashboard = (props) => {

  const firebase = useContext(FirebaseContext)
  const userContext = useContext(UserContext)

  const [infosLevel , setinfosLevel ] = useState(null)
  const [ niveauxSchool , setNiveauxSchool ] = useState([])
  const [ useConnectedId , setUserConnectedId ] = useState(null);  

  const matieres = [
      {
         title : "Mathématiques",
         logo : LogoMath,
         urlParam : "Mathematique"
      },
      {
        title : "Physique",
        logo : LogoPhysique,
        urlParam : "Physique"
     },
     {
        title : "Anglais",
        logo : LogoAnglais,
        urlParam : "Anglais"
     },
     {
        title : "Histoire Géo",
        logo : LogoGeo,
        urlParam : "Histoire-Geo"
     },
     {
        title : "Philosophie",
        logo : LogoPhilo,
        urlParam : "Philosophie"
     },
     {
        title : "SVT",
        logo : LogoSVT,
        urlParam : "SVT"
     },
     {
        title : "Ingénierie",
        logo : LogoIng,
        urlParam : "Ingenierie"
     },
     {
        title : "Jeux",
        logo : LogoJeux,
        urlParam : "Jeux"
     }

  ]
    
    useEffect(() => {
   
        firebase.auth.onAuthStateChanged( user => {
          if(user){
            //code if realod page pour garder context api values
            userContext.get_connected_user(user);
            const userId = user.uid;                      
            const database = firebase.getData();
            const reference =  database.ref('users/'+userId)
      
            setUserConnectedId(userId)
  
            reference.once("value", user_informations => {
                userContext.get_user_informations(user_informations.val());
               setinfosLevel(user_informations.val().level)
              
            })
            
            
          }
          else{

           console.log('not login');
           props.history.push('/')
          }
        });
      }, []);

   
    
  

    const [niveaux , setNiveaux] = useState('');   
    const [ modalOpen , setModalOpen  ] = useState(false);
    const [ valueNiveau ,setValueNiveau] =useState('');


    const handleShowModal = () => {
        const database = firebase.getData();
        const ref_niveaux = database.ref('schoolLevels/all');
            ref_niveaux.on("value", snapshot => {
            // const messageObject = snapshot.val();
                setNiveauxSchool(snapshot.val())
                
               
            })
        setModalOpen(true);

    }

    const handleCloseModal = () =>{ 
        
        setModalOpen(false);
        setinfosLevel( userContext.user_informations.level)
    }

    const ChoixNiveau = (niveau) => {

        setValueNiveau(niveau)
        handleCloseModal()
    }

    
    
  
        return (
           
            <div className="container">
               
                <p  className="cree_ton_compte" onClick = {handleShowModal}>
                    { (valueNiveau )  ?  
                    <span> {valueNiveau} </span>
                        :
                    <span>{infosLevel}</span>
                    } 
                </p>

      
                <div className="matiere_component">
                    { matieres.map( (matiere , index) => {
                        return (
                            <Link key={index} to={`/chapitres/${matiere.urlParam}`} >
                                <MatiereComponent
                                
                                 title={matiere.title}
                                 logo={matiere.logo} />
                            </Link>  
                        )
                        
                    }) }
                </div>
                    
                    
                    

                     
                    
                    <Modal
                    size="md"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    show={modalOpen}
                    onHide={handleCloseModal}
                    >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            <h4 style={{color:'#707070'}}>ALLER EN ...</h4> 
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body >
                        <div className="niveaux_school">
                           
                           { niveauxSchool.map( (niveau,index) => {
                               return (
                                    <div >
                                       
                                        <NiveauxSchool
                                         key={index}
                                         userConnected={useConnectedId}
                                         title={niveau} />
                                        
                                    </div>
                               )
                              
                           })

                           }
                            

                            
                 
                        </div>
                        
                    </Modal.Body>

                    </Modal>      
            </div>

            
        )
   // }
}

export default Dashboard;
