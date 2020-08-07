import React, { Component,useState,useContext,useEffect } from 'react'
import MatiereComponent from './Matieres/MatiereComponent';
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




const  Dashboard = (props) => {

  const firebase = useContext(FirebaseContext)
  const userContext = useContext(UserContext)

  const [infosLevel , setinfosLevel ] = useState(null)
    
    
    useEffect(() => {

        //setInfos(userContext.user_informations)
   
        firebase.auth.onAuthStateChanged( user => {
          if(user){
            //code if realod page pour garder context api values
            userContext.get_connected_user(user);
            const userId = user.uid;
                      
            const database = firebase.getData();
            const reference =  database.ref('users/'+userId)
      
           
  
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

   // const value=useContext(LoggedinContext)

   
    
        //console.log(value)
   
    
    

    const listStyle = {
        marginTop: "-1px", /* Prevent double borders */
        padding: "12px",
        textDecoration: "none",
        fontSize: "18px",
        display: "block",
        position: "relative",
        color:'#707070'
    }

    const fleche = {
        cursor: "pointer",
        position: "absolute",
        top: "5%",
        right: "0%",
        padding: "12px 16px",
    }

    const [niveaux , setNiveaux] = useState('');   
    const [ modalOpen , setModalOpen  ] = useState(false);
    const [ valueNiveau ,setValueNiveau] =useState('');
    const handleShowModal = () => setModalOpen(true);
    const handleCloseModal = () => setModalOpen(false);

    const ChoixNiveau = (niveau) => {
        setValueNiveau(niveau)
        handleCloseModal()
    }

    
  
        return (
           
            <div className="container">
               
                <p  className="cree_ton_compte" onClick = {handleShowModal}>
                    { (valueNiveau )  ?  
                    <center> {valueNiveau} </center>
                        :
                    <center>{infosLevel}</center>
                    } 
                </p>

                    <div className="row">
                        <div className="col-md-6">
                            <Link to="/chapitres">
                                <MatiereComponent title="Mathématiques" logo={LogoMath} />
                            </Link>
                        </div>
                        <div className="col-md-6">
                            <MatiereComponent title="Physique" logo={LogoPhysique} /> 
                        </div>
                    </div>
                    

                    <div className="row">
                        <div className="col-md-6">
                            <MatiereComponent title="Anglais" logo={LogoAnglais} />
                        </div>
                        <div className="col-md-6">
                            <MatiereComponent title="Histoire Géo" logo={LogoGeo} />
                        </div>
                    </div>    
                    
                    <div className="row">
                        <div className="col-md-6">
                            <MatiereComponent title="Philosophie" logo={LogoPhilo} />
                        </div>
                        <div className="col-md-6">
                            <MatiereComponent title="SVT" logo={LogoSVT} />
                        </div>
                    </div>   

                    <div className="row">
                        <div className="col-md-6">
                            <MatiereComponent title="Ingénierie" logo={LogoIng} />
                        </div>
                        <div className="col-md-6">
                             <MatiereComponent title="Jeux" logo={LogoJeux} />
                        </div>
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
                        <div className="container">
                            <div className="row">
                                <div className="col-md-6">
                                    <ul >
                                    <li style={listStyle}>CE1 <span style={fleche} onClick={() => ChoixNiveau('CE1')}>&gt;</span> </li>
                                    <li style={listStyle}>CM1 <span style={fleche} onClick={() => ChoixNiveau('CM1')}>&gt;</span> </li>
                                    <li style={listStyle}>Sixième <span style={fleche} onClick={() =>ChoixNiveau('Sixième')}>&gt;</span> </li>
                                    <li style={listStyle}>Quatrième <span style={fleche} onClick={() =>ChoixNiveau('Quatrième')}>&gt;</span> </li>
                                    </ul>
                                </div>

                                <div className="col-md-6">
                                    <ul >
                                        <li style={listStyle}>CE2 <span style={fleche} onClick={() =>ChoixNiveau('CE2')}>&gt;</span> </li>
                                        <li style={listStyle}>CM2 <span style={fleche} onClick={() =>ChoixNiveau('CM2')}>&gt;</span> </li>
                                        <li style={listStyle}>Cinquième <span style={fleche} onClick={() =>ChoixNiveau('Cinquième')}>&gt;</span> </li>
                                        <li style={listStyle}>Troisième <span style={fleche} onClick={() =>ChoixNiveau('Troisième')}>&gt;</span> </li>
                                    </ul>
                                </div>

                            </div>
                            

                            
                 
                        </div>
                        
                    </Modal.Body>

                    </Modal>      
            </div>

            
        )
   // }
}

export default Dashboard;
