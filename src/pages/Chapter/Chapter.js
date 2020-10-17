import React , { useState , useEffect , useContext } from 'react';
import { useHistory } from "react-router-dom";
import UserContext from '../../Context/UserContext/UserContext';


import courseImg from './assets/images/Cours.png';
import quizzImg from './assets/images/Quiz.png';
import exercisesImg from './assets/images/exercices.png';

import Courses from './Courses/Courses';
import Exrecises from './Exercises/Exercises';
import Quizz from './Quizz/Quizz';
import ChapterButton from './ChapterButton/ChapterButton';

import {Breadcrumb} from 'semantic-ui-react';
import { Link } from 'react-router-dom'

import AOS from 'aos';



import './style/Chapter.scss';


const Chapter = ({match}) => {

    const userContext = useContext(UserContext);
    const history = useHistory();


    useEffect(() => {
        AOS.init({
            duration: 2000,
        });

        if(!userContext.user){
            history.push('/404');
        }


    } , [userContext.user]);

    
    /* Component data */


    //console.log(match)

    /* Component state */
    const [ coursesContent , setCoursesContent ]  = useState(true);
    const [ quizzContent , setQuizzContent ] = useState(false);
    const [ exercisesContent , setExercisesContent ] = useState(false);
    const [ courses_memoized , set_courses_memoized ] = useState(null);



    /*--- Component functions  ---*/
    const handleChapterCoursesButton = () => {
        setCoursesContent(true);
        setQuizzContent(false);
        setExercisesContent(false);
    }

    const handleChapterQuizzButton = () => {
        setQuizzContent(true);
        setCoursesContent(false);
        setExercisesContent(false);
        history.push(`/quizz/${match.params.matieres}/${match.params.chapitre}`);
    }

    const handleChapterExercisesButton = () => {
        setExercisesContent(true);
        setCoursesContent(false);
        setQuizzContent(false);
    }


    return (
        <section className = 'container chapter-page-container'>
            <div className="breadcrumb-container">
                <Breadcrumb>
                    <Breadcrumb.Section className = 'breadcrumb-home' > <Link to = '/'> Accueil </Link> </Breadcrumb.Section>
                    <Breadcrumb.Divider className = 'breadcrumb-home-chevron' icon='right chevron' />
                    <Breadcrumb.Section className = 'breadcrumb-evolution'> <Link to = {`/dashboard-user`}> Mon parcours </Link> </Breadcrumb.Section>
                        <Breadcrumb.Divider className = 'breadcrumb-evolution-chevron' icon='right chevron' />
                    <Breadcrumb.Section > <Link to = {`/chapitres/${match.params.matieres}`}> {match.params.matieres} </Link> </Breadcrumb.Section>
                    <Breadcrumb.Divider icon='right chevron' />
                    <Breadcrumb.Section active> {match.params.chapitre} </Breadcrumb.Section>
                </Breadcrumb>
            </div>
            <div className="chapter-title-container">
                <h2 className="chapter-title"> Les différentes écritures d'un nombre  </h2>
            </div>

            <div className="chapter-features-container">
                <ChapterButton name = 'Course' imgSrc = { courseImg }  clicked = { handleChapterCoursesButton } />
                <ChapterButton name = 'Quizz' imgSrc ={quizzImg} clicked = { handleChapterQuizzButton } />
                <ChapterButton name = 'Exercise' imgSrc = {exercisesImg} clicked = {handleChapterExercisesButton} />
            </div>

            <div className="chapter-content">
                { coursesContent && <div className="chapter-exercises-container"> <Courses urlParams = {match.params} courses_memoized = { courses_memoized } memoized = { (courses) => set_courses_memoized(courses) } /> </div>}
                { quizzContent && <div className="chapter-courses-container"> <Quizz quizz = 'quizz' /> </div> }
                { exercisesContent &&  <div className="chapter-quizz-container">  <Exrecises urlParams = {match.params} exercises = 'exercices' /> </div>}  
            </div>
        </section>
    );
}

export default Chapter
