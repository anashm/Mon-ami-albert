import React, { useState,useContext,useEffect } from 'react'
import ChapitreComponent from './ChapitresComp/ChapitreComponent';
import './style/Chapitres.css';
import { Link } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';
import { useHistory  } from "react-router-dom";
import {FirebaseContext} from '../../firebase';
import UserContext from '../../Context/UserContext/UserContext';
import { Dimmer, Loader } from 'semantic-ui-react';
import AOS from 'aos';
import { Alert } from 'react-bootstrap';


const  Chapitres = ({match}) => {

    const SCORE_MAX = 60;

    
    var matiere = match.params.matieres;
    const firebase = useContext(FirebaseContext);
    const userContext = useContext(UserContext);
    const [infosLevel , setinfosLevel ] = useState(null);
    const [ chapters , setChapters ] = useState([]);


    const [ loading , setLoading ] = useState(true);

    const [dimmer , setDimmer ] = useState(true)
    const history = useHistory();


    useEffect(() => {

            AOS.init({
                duration: 800
            });


        firebase.auth.onAuthStateChanged( user => {
        if(user){
            //code if realod page pour garder context api values
            userContext.get_connected_user(user);
            const userId = user.uid;                      
            const database = firebase.getData();
            const reference =  database.ref('users/'+userId)
            reference.once("value", user_informations => {
            userContext.get_user_informations(user_informations.val());
            setinfosLevel(user_informations.val().level);


            
            const reference_chapitres = database.ref('schoolLevels/'+user_informations.val().level+'/subjects/'+matiere+'/all')

            reference_chapitres.on("value", chapitres => {


                if(chapitres.val()){
                    
                    chapitres.val().map(chapter => {
                        const reference =  database.ref(`users/${userId}/Progression/${user_informations.val().level}/${matiere}/${chapter}/progression`);                  
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
            })

        }else{

            console.log('not login');
            history.push('/')
          }
        });
      }, [firebase]);

    const [ openTab , setOpenTab ] = useState(true);

        return (
            <div className="container chapter-section" >
                <div className="exercices-container">
                    <div className = 'exercises-title-container ' onClick = { () => setOpenTab(!openTab) } >
                        <h2 className="exercises-title">Chapitres</h2>

                        <div className="exercises-infos">
                            <div className="exercises-number"> {chapters ? chapters.length : 0} </div>
                            <div className="show-hide-icon">
                                <span> <Icon name= {` ${ openTab ? 'minus square outline' : 'plus square outline' } `} link size='small' className = 'minus-icon' /> </span>
                            </div>
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
                                </Dimmer>) :  <Alert variant= 'secondary'>
                                                No Chapters available!
                                            </Alert>}
                                
                            </div> : ''
                        }
                        
                    </div>
                </div>
            </div>   
        )
    
}

export default Chapitres;
