import React, { useState,useContext,useEffect , Fragment } from 'react'
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
import {FirebaseContext} from '../../firebase';
import UserContext from '../../Context/UserContext/UserContext';
import NiveauxSchool from './Matieres/NiveauxSchoolComponent';
import AOS from 'aos';
import { Icon , Divider , Breadcrumb , Loader} from 'semantic-ui-react';
import Header from '../../components/header/Header';
import { useHistory } from 'react-router-dom'



const  Dashboard = (props) => {

  const firebase = useContext(FirebaseContext);
  const userContext = useContext(UserContext);

  const history = useHistory();

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
    /* {
        title : "Ingénierie",
        logo : LogoIng,
        urlParam : "Ingenierie"
    },
    {
        title : "Jeux",
        logo : LogoJeux,
        urlParam : "Jeux"
    } */
]
    
    useEffect(() => {
        AOS.init({
            duration: 800
        });
        userContext.update_current_location(history.location.pathname);
        return () => {
            userContext.update_current_location('');
        }
        
        if(userContext.user){
            if(niveauxSchool.length < 1){
                const database = firebase.getData();
                const ref_niveaux = database.ref('schoolLevels/all');
                ref_niveaux.on("value", snapshot => {
                // const messageObject = snapshot.val();
                    setNiveauxSchool(snapshot.val());
                })
            }
        }

    }, [userContext.user]);


    const [ modalOpen , setModalOpen  ] = useState(false);




    const handleShowModal = () => {
        setModalOpen(true);
    }

    const handleCloseModal = () =>{ 
        setModalOpen(false);
    }

        return (
            <div className="container dashboard-section">
                <div className="breadcrumb-container">
                    <Breadcrumb>
                        <Breadcrumb.Section > <Link to = '/'> Accueil </Link> </Breadcrumb.Section>
                        <Breadcrumb.Divider icon='right chevron' />
                        <Breadcrumb.Section active>Mon parcours</Breadcrumb.Section>
                    </Breadcrumb>
                </div>
                <div className="mon-parcours-container">
                    <span className="text-mon-parcours-span">Mon parcours</span>
                </div>
                
                <p  className="cree_ton_compte" onClick = {handleShowModal}>
                    {
                        (userContext.user_informations) ? <Fragment> <span>{userContext.user_informations.level}</span> <Icon name = 'angle down' />  </Fragment>  : <span><Loader active inline='centered' /> </span> 
                    }
                </p>

                <div className="matiere_component">
                    { matieres.map( (matiere , index) => {
                        return (
                            <Link key={index} to={`/chapitres/${matiere.urlParam}`}data-aos="fade-down" data-aos-delay={50 + index*100}  data-aos-once="true">
                                <MatiereComponent
                                    course = { matiere.title }
                                    title={matiere.title}
                                    logo={matiere.logo} />
                            </Link>  
                        )
                        
                    }) }
                </div>
                    
                    <Modal
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    show={modalOpen}
                    onHide={handleCloseModal}
                    className = 'dashboard-modal'
                    >
                        <Modal.Header closeButton>
                            <Modal.Title id="contained-modal-title-vcenter">
                                <h4 className = 'text-center'>ALLER EN ...</h4> 
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body >
                            <div className="niveaux_school">
                                { niveauxSchool.map( (niveau,index) => (
                                        <div key={index} >
                                            <NiveauxSchool
                                            userConnected={useConnectedId}
                                            title={niveau} 
                                            clicked = { handleCloseModal }
                                            />
                                            
                                        </div>
                                    ))
                                }
                            </div>
                        </Modal.Body>
                    </Modal>      
            </div>

        )
   // }
}

export default Dashboard;
