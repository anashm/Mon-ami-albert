import React, { useState,useContext,useEffect , Fragment } from 'react'
import ChapitreComponent from './ChapitresComp/ChapitreComponent';
import './style/Chapitres.css';
import { Link } from 'react-router-dom';
import { Icon , Breadcrumb } from 'semantic-ui-react';
import { useHistory  } from "react-router-dom";
import {FirebaseContext} from '../../firebase';
import UserContext from '../../Context/UserContext/UserContext';
import { Dimmer, Loader } from 'semantic-ui-react';
import AOS from 'aos';
import { Alert } from 'react-bootstrap';
import { Modal,Button } from 'react-bootstrap';
import albert from '../../images/quizz/albert-quiz.png';

const  Chapitres = ({match}) => {

    const SCORE_MAX = 60;
    let matiere = match.params.matieres;
    const firebase = useContext(FirebaseContext);
    const userContext = useContext(UserContext);
    const [infosLevel , setinfosLevel ] = useState(null);
    const [ chapters , setChapters ] = useState([]);


    const [ loading , setLoading ] = useState(true);
    const [textMatiere ,setTextMatiere] = useState('')
    const [showModal , setShowModal] = useState(false)
    const [dimmer , setDimmer ] = useState(true);
    const [ openTab , setOpenTab ] = useState(true);
    const history = useHistory();


    useEffect(() => {

        AOS.init({
            duration: 800,
        });

        if(matiere === 'Physique'){
            setShowModal(true)  
            setTextMatiere("On est en train de préparer ton labo physique chimie à la vitesse de la lumière. T'inquiète il sera bientot disponible !")
        }
        else if (matiere === 'Anglais'){
            setShowModal(true)  
            setTextMatiere("Ladies & gentlemen,all in good time ... vos chapitres seront bientot disponibles ! ")
        } 
        else if (matiere === 'Histoire-Geo'){
            setShowModal(true)  
            setTextMatiere("Remonter le temps et faire le tour du monde ce n'est pas une mince affaire,mais t'inquiète c'est pour bientot ! ")
        }  
        else if (matiere === 'Philosophie'){
            setShowModal(true)  
            setTextMatiere("Içi la condition humaine est en cours de traitement et ses concepts clés seront bientot disponibles ! ")
        }
        else if (matiere === 'SVT'){
            setShowModal(true)  
            setTextMatiere("Votre écosystème SVT est en cours de préparation et le calendrier géologique nous indique que c'est pour bientot ! ")
        }      
        if(userContext.user && userContext.user_informations){
            //code if realod page pour garder context api values
            const userId = userContext.user.uid;                      
            const database = firebase.getData();
            //const reference =  database.ref('users/'+userId)

            setinfosLevel(userContext.user_informations.level);

            const reference_chapitres = database.ref('schoolLevels/'+userContext.user_informations.level+'/subjects/'+matiere+'/all');
            reference_chapitres.on("value", chapitres => {
                if(chapitres.val()){
                    chapitres.val().map(chapter => {
                        const reference =  database.ref(`users/${userId}/Progression/${userContext.user_informations.level}/${matiere}/${chapter}/progression`);                  
                        reference.once('value' , data => {
                            if(data.val()){
                                setChapters(prevState => [...prevState , {
                                    title: chapter,
                                    points: data.val().points
                                }]);
                            }
                            
                            if(!data.val()){
                                setChapters(prevState => [...prevState , {
                                    title: chapter,
                                    points: 0
                                }]);
                            }
                        });
                    });
                }
                
                //close loader
                else{
                    setDimmer(false)
                }

            });
            

        }
      }, [userContext.user_informations , userContext.user ]);

    
    const HandleCloseModal = () => {
        setShowModal(false)
        history.push('/dashboard-user')
    }

        return (
            <div className="container chapter-section" >
                <div className="breadcrumb-container hide-on-mobile">
                    <Breadcrumb>
                        <Breadcrumb.Section className = 'hide-on-mobile' > <Link to = '/'> Accueil </Link> </Breadcrumb.Section>
                        <Breadcrumb.Divider className = 'hide-on-mobile' icon='right chevron' />
                        <Breadcrumb.Section > <Link to = {`/dashboard-user`}> Mon parcours </Link> </Breadcrumb.Section>
                        <Breadcrumb.Divider icon='right chevron' />
                        <Breadcrumb.Section active>{matiere} </Breadcrumb.Section>
                    </Breadcrumb>
                </div>

                <div className="chapter-course-container">
                    <p className = 'course'> {matiere} </p>
                    <div className="chapter">
                        <div className="chapter-number"> {chapters.length > 1 ? chapters.length : 0} </div>
                        <p> Chapitres </p>
                    </div>
                </div>



                <div className="exercices-container">
                    <div className = 'exercises-title-container ' onClick = { () => setOpenTab(!openTab) } >
                        <h2 className="exercises-title">Chapitres</h2>

                        <div className="exercises-infos">
                            <div className="exercises-number"> {chapters ? chapters.length : 0} </div>
                            {/* <div className="show-hide-icon">
                                <span> <Icon name= {` ${ openTab ? 'minus square outline' : 'plus square outline' } `} link size='small' className = 'minus-icon' /> </span>
                            </div> */}
                        </div>
                    </div>
                    <div className="exercises-content" style = { { transform: `${!openTab ? 'scaleY(0)' : 'scaleY(1)'}` , transformOrigin: '100% 0%' } } >
                        
                       

                        { chapters.length > 1 ?
                        
                            <div className="chapters">
                                {  chapters.map( (chapitre,index) => {
                                    return (
                                        <Link to={`/chapter/${matiere}/${chapitre.title}`} key = {index} data-aos-delay={50 + index*50} data-aos="fade-down" data-aos-once="true"> 
                                            <ChapitreComponent ordre={index+1} title={chapitre.title} percentage = { Math.floor((chapitre.points/SCORE_MAX)*100) } />
                                        </Link>
                                    )
                                    
                                })  }
                            </div> : ''
                        }

                        { chapters.length < 1 ? 
                            <div className="loader-container" style = {{ height: '30vh' }}>
                                {dimmer ? (<Dimmer active inverted>
                                    <Loader inverted content='Chargement en cours...' />
                                </Dimmer>) :  
                                    <Alert variant= 'secondary'>
                                       
                                    </Alert>
                                }
                                
                            </div> : ''
                        }
                        {
                                        (
                                            <Modal
                                            show={showModal}
                                            onHide={HandleCloseModal}
                                            size = 'lg'
                                                
                                                aria-labelledby="contained-modal-title-vcenter"
                                                centered
                                            >
                                                <Modal.Header closeButton>
                                                    <Modal.Title id="contained-modal-title-vcenter">
                                                        
                                                    </Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body>

                                                    <div className = 'chapitre-modal'>
                                                        <div class="bubble bubble-bottom-left" contenteditable> { textMatiere } </div>
                                                        <img  src={albert} alt="" className="albert-img"/>
                                                    </div>
                                                </Modal.Body>
                                                <Modal.Footer>
                                                    
                                                    <Button onClick={HandleCloseModal} variant="light">OK</Button>
                                                </Modal.Footer>
                                            </Modal>
                                            
                                        ) 
                                    }
                       
                    </div>
                </div>
            </div>   
        )
    
}

export default Chapitres;