import React , { useState } from 'react';
import { useHistory } from "react-router-dom";


import courseImg from './assets/images/Cours.png';
import quizzImg from './assets/images/Quiz.png';
import exercisesImg from './assets/images/exercices.png';

import Courses from './Courses/Courses';
import Exrecises from './Exercises/Exercises';
import Quizz from './Quizz/Quizz';
import ChapterButton from './ChapterButton/ChapterButton';

import {Divider} from 'semantic-ui-react';

import './style/Chapter.scss';


const Chapter = ({match}) => {

    
    /* Component data */

    const history = useHistory();

    //console.log(match)

    /* Component state */
    const [ coursesContent , setCoursesContent ]  = useState(false);
    const [ quizzContent , setQuizzContent ] = useState(false);
    const [ exercisesContent , setExercisesContent ] = useState(true);



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
            <Divider hidden />

            <div className="chapter-title-container">
                <h2 className="chapter-title"> Les différentes écritures d'un nombre  </h2>
            </div>

            <div className="chapter-features-container">
                <ChapterButton name = 'Course' imgSrc = { courseImg }  clicked = { handleChapterCoursesButton } />
                <ChapterButton name = 'Quizz' imgSrc ={quizzImg} clicked = { handleChapterQuizzButton } />
                <ChapterButton name = 'Exercise' imgSrc = {exercisesImg} clicked = {handleChapterExercisesButton} />
            </div>

            <div className="chapter-content">
                { coursesContent && <div className="chapter-exercises-container"> <Courses urlParams = {match.params} /> </div>}
                { quizzContent && <div className="chapter-courses-container"> <Quizz quizz = 'quizz' /> </div> }
                { exercisesContent &&  <div className="chapter-quizz-container">  <Exrecises urlParams = {match.params} exercises = 'exercices' /> </div>}  
            </div>
        </section>
    );
}

export default Chapter
