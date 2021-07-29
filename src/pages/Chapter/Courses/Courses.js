import React,{useEffect,useContext,useState, useCallback} from 'react'
import { useHistory , useParams } from "react-router-dom";
import {FirebaseContext} from '../../../firebase';
import UserContext from '../../../Context/UserContext/UserContext';
import './Courses.css';
import { Alert } from 'react-bootstrap';
import Latex from 'react-latex';
import parse from 'html-react-parser'
import { convertText } from '../../../utils/functions';

const Courses = ({ urlParams , memoized , courses_memoized }) => {

    //console.log(urlParams.params.matieres)
    // let matiere =  urlParams.matieres;
    // let chapitre = urlParams.chapitre;

    // const level = urlParams.level;

    const {level , course , chapter } = useParams();
    const [ chapterCoursesLoading , setChapterCoursesLoading ] = useState(true); 
    const [ allCourses , setAllCourses ] = useState([])
    const firebase = useContext(FirebaseContext)
    const userContext = useContext(UserContext)

    // const [ courses_user , setCoursesUser ] = useState([]);


    const fetchChapterCourse = useCallback(async () => {
        try {
            setChapterCoursesLoading(true);
            const database = firebase.getData();
            const chapterCourseRef = database.ref('schoolLevels/'+level+'/subjects/'+course+'/'+chapter+'/cours');
            const chapterCourses = await chapterCourseRef.once("value");
            const allChapterCourses = chapterCourses.val();
            console.log(allChapterCourses)
            setAllCourses(allChapterCourses || []);
            setChapterCoursesLoading(false);

            
        } catch (error) {
            console.log(error);
            setChapterCoursesLoading(false);
        }
    } , [level , course , chapter , firebase])

    useEffect(() => {
        if(userContext.user){
            fetchChapterCourse();
        }


    }, [userContext.user , fetchChapterCourse]);


    return (
        <div>
            { allCourses.length < 1 && <Alert variant= 'secondary'> Liste des cours en cours de préparation ...</Alert>  }

            {allCourses.length > 0 && allCourses.map( (cours,index) => {
                return(
                    <div key={index}>
                        <div className="bigTitle-container">
                            <h4 className="span-big-title"> {cours?.index} {" "} {cours?.bigTitle} </h4>
                        </div> 
                        
                        {cours?.subTitles?.map((subs , index) => {
                            return (
                                <div key={index}>
                                    <div className="span-subtitles">
                                        {convertText(subs?.subTitle)}  
                                        {/* <MathJax  math={subs.index} /> */} &nbsp;&nbsp; 
                                        <p className="subTitles-style"> {convertText(subs.subtitle)} {/* <MathJax   math={subs.subtitle} />  */}</p> 
                                    </div>
                                    {subs.contenu.map( (type,index) => {
                                        return(
                                            <div key={index}>
                                                
                                                    {(type.type) === 'Picture' ? 
                                                        <div>
                                                            <div className="type-container">
                                                                <p className="class-type">{convertText(type.type)}</p> 
                                                            </div> 
                                                            {type?.lines?.map( (line ,index) => {
                                                            
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
                                                                {type?.type?.toLowerCase() !== 'picture' && <p className="class-type"> { convertText(type.type) } </p>}
                                                            </div> 
                                                            
                                                            {type?.lines?.map( (line ,index) => {
                                                                console.log(line);
                                                                return (
                                                                    <>
                                                                    <div key={index} className="lines-container">
                                                                        { line?.line ? <p > { convertText(line?.line)}</p> :  line && <p > { convertText(line)}</p>   }
                                                                    </div>
                                                                    <div key={index} className="lines-container">
                                                                        { line?.picture && <img src={line?.picture} alt = '' />   }                                                                   
                                                                    </div>
                                                                     </>                                                                       

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
