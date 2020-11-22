import React,{useEffect,useContext,useState} from 'react'
import { useHistory } from "react-router-dom";
import {FirebaseContext} from '../../../firebase';
import UserContext from '../../../Context/UserContext/UserContext';
import './Courses.css';
import { Alert } from 'react-bootstrap';
import Latex from 'react-latex';
import parse from 'html-react-parser'

const Courses = ({ urlParams , memoized , courses_memoized }) => {

    //console.log(urlParams.params.matieres)
    let matiere =  urlParams.matieres;
    let chapitre = urlParams.chapitre;

    const firebase = useContext(FirebaseContext)
    const userContext = useContext(UserContext)

    const [ courses_user , setCoursesUser ] = useState([]);


    useEffect(() => {
        if(userContext.user){
            //code if realod page pour garder context api values
            if(courses_memoized){
                setCoursesUser(courses_memoized);
            }else{
                const userId = userContext.user.uid;                      
                const database = firebase.getData();
                const reference =  database.ref('users/'+userId)
    
                reference.once("value", user_informations => {
                    const reference_exercices = database.ref('schoolLevels/'+user_informations.val().level+'/subjects/'+matiere+'/'+chapitre+'/cours')
                    reference_exercices.once("value", cours_collection => {
                        let courses = cours_collection.val();
                        if(courses) {
                            setCoursesUser(courses);
                            memoized(courses)
                        }
                    })
                })
            }
        }


    }, [userContext.user]);


    return (
        <div>
            { courses_user.length ===0 && <Alert variant= 'secondary'> Liste des cours en cours de préparation ...</Alert>  }

            {courses_user.map( (cours,index) => {
                return(
                    <div key={index}>
                        <div className="bigTitle-container">
                            <h4 className="span-big-title"> {cours.index} &nbsp;&nbsp;<Latex>{String.raw`${cours.bigTitle}`}</Latex>  </h4>
                        </div> 
                        
                        {cours.subTitles.map((subs , index) => {
                            return (
                                <div key={index}>
                                    <div className="span-subtitles">
                                        <Latex>{String.raw`${subs.index}`}</Latex>  {/* <MathJax  math={subs.index} /> */} &nbsp;&nbsp; <p className="subTitles-style"> <Latex>{String.raw`${subs.subtitle}`}</Latex> {/* <MathJax   math={subs.subtitle} />  */}</p> </div>
                                    {subs.contenu.map( (type,index) => {
                                        return(
                                            <div key={index}>
                                                
                                                    {(type.type) === 'Picture' ? 
                                                        <div>
                                                            <div className="type-container">
                                                                <p className="class-type"><Latex>{String.raw`${type.type}`}</Latex></p> 
                                                            </div> 
                                                            {type.lines.map( (line ,index) => {
                                                            
                                                                return (
                                                                    <div key={index} className="lines-container">
                                                                        
                                                                            <img src={line} alt = '' />
                                                            
                                                                    </div>
                                                                    
                                                                )
                                                            })}
                                                        </div>
                                                    : 
                                                        <div>
                                                            <div className="type-container">
                                                                {type.type == undefined ? '' : 
                                                                <p className="class-type"><Latex>{String.raw`${type.type}`}</Latex></p>
                                                                }
                                                                 
                                                            </div> 
                                                            
                                                            {type.lines.map( (line ,index) => {
                                                            
                                                                return (
                                                                    <div key={index} className="lines-container">
                                                                        <p >
                                                                            {
                                                                                (line.startsWith("<p>")) ? 
                                                                                <>
                                                                               
                                                                                <Latex>{String.raw`${parse(line)[0].props.children}`}</Latex>
                                                                                </>
                                                                                :
                                                                                <>
                                                                               
                                                                                <Latex>{String.raw`${line}`}</Latex>
                                                                                </>
                                                                            }
                                                                           
                                                                        </p>
                                                                    
                                                                    
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
