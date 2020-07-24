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


const Chapter = () => {

    /* Component data */

    const history = useHistory();




    /* Component state */
    const [ coursesContent , setCoursesContent ]  = useState(false);
    const [ quizzContent , setQuizzContent ] = useState(false);
    const [ exercisesContent , setExercisesContent ] = useState(true);



    /* Component functions */
    const handleChapterCoursesButton = () => {
        setCoursesContent(true);
        setQuizzContent(false);
        setExercisesContent(false);
    }

    const handleChapterQuizzButton = () => {
        setQuizzContent(true);
        setCoursesContent(false);
        setExercisesContent(false);
        history.push('/quizz');

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
                { coursesContent && <div className="chapter-exercises-container"> <Courses courses = 'No Courses available' /> </div>}
                { quizzContent && <div className="chapter-courses-container"> <Quizz quizz = 'quizz' /> </div> }
                { exercisesContent &&  <div className="chapter-quizz-container">  <Exrecises exercises = 'exercices' /> </div>}  
            </div>
        </section>
    );
}

export default Chapter
