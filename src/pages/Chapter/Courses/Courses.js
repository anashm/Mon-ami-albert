import React,{useEffect,useContext,useState} from 'react'
import { useHistory } from "react-router-dom";
import {FirebaseContext} from '../../../firebase';
import UserContext from '../../../Context/UserContext/UserContext';
import './Courses.css';
import MathJax from 'react-mathjax-preview'
import { Accordion,Card,Button } from 'react-bootstrap';

const Courses = ({ urlParams }) => {

    var matiere =  urlParams.matieres;
    var chapitre = urlParams.chapitre;

    const firebase = useContext(FirebaseContext)
    const userContext = useContext(UserContext)
    const history = useHistory()

    const [ courses_user , setCoursesUser ] = useState([])
    

    useEffect(() => {
       
        firebase.auth.onAuthStateChanged( user => {
          if(user){
              //code if realod page pour garder context api values
               userContext.get_connected_user(user);
               const userId = user.uid;                      
               const database = firebase.getData();
               const reference =  database.ref('users/'+userId)
      
                reference.once("value", user_informations => {
                userContext.get_user_informations(user_informations.val());
              //  setinfosLevel(user_informations.val().level)
                
                
                    const reference_exercices = database.ref('schoolLevels/Terminale/subjects/'+matiere+'/'+chapitre+'/cours')

                    reference_exercices.once("value", cours_collection => {
                        const courses = cours_collection.val();
                        setCoursesUser(courses);              
                    })
                }) 
                     
          }
          else{

           console.log('not login');
           history.push('/')
          }
        });
  
      }, []);


    return (
        <div>
           
            {courses_user.map( (cours,index) => {
                return(
                    <div key={index}>
                       <div className="bigTitle-container">
                            <h4 className="span-big-title"> {cours.index} &nbsp;&nbsp; {cours.bigTitle} </h4>
                        </div> 
                        
                        {cours.subTitles.map((subs , index) => {
                            return (
                               <div key={index}>
                                   <div className="span-subtitles"> <MathJax  math={subs.index} /> &nbsp;&nbsp; <MathJax  math={subs.subtitle} /> </div>
                                   {subs.contenu.map( (type,index) => {
                                       return(
                                           <div key={index}>
                                                
                                                    {(type.type) == 'Picture' ? 
                                                        <div>
                                                            <div className="type-container">
                                                                <p className="class-type">{type.type}</p> 
                                                            </div> 
                                                            {type.lines.map( (line ,index) => {
                                                            
                                                                return (
                                                                    <div key={index} className="lines-container">
                                                                        
                                                                            <img src={line} />
                                                                        
                                                                    </div>
                                                                    
                                                                )
                                                            })}
                                                        </div>
                                                    : 
                                                        <div>
                                                            <div className="type-container">
                                                                <p className="class-type">{type.type}</p> 
                                                            </div> 
                                                            
                                                      
                                                            {type.lines.map( (line ,index) => {
                                                            
                                                                return (
                                                                    <div key={index} className="lines-container">
                                                                        <p >
                                                                            <MathJax   math={line} />
                                                                        </p>
                                                                    
                                                                   {/*  <Accordion defaultActiveKey="0">
                                                                        <Card>
                                                                            <Card.Header>
                                                                            <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                                                                Click me!
                                                                            </Accordion.Toggle>
                                                                            </Card.Header>
                                                                            <Accordion.Collapse eventKey="0">
                                                                            <Card.Body><MathJax   math={line} /></Card.Body>
                                                                            </Accordion.Collapse>
                                                                        </Card>
                                                    
                                                                    </Accordion> */}
                                                                    </div>
                                                                )
                                                            })}
                                                         
                                                        </div>     
                                                    }
                                                
                                               
                                               
                                            
                                              
                                           </div>
                                       )
                                   })}
                               </div> 
                                
                            )
                            
                        }) }
                        
                    </div>
                    
                )
                
            })}
        </div>
    )
}

export default Courses
