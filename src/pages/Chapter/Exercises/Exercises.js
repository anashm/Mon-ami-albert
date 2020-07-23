import React , { useState } from 'react';

import { Icon } from 'semantic-ui-react';
import Exercise from './Exercise/Exercise';
import exercises from './ex';
import './Exercises.scss';

const Exercises = () => {

    const allExercises = exercises;

    const [ openTab , setOpenTab ] = useState(true);

    return (
        <div className="exercices-container">
            <div className = 'exercises-title-container ' onClick = { () => setOpenTab(!openTab) } >
                <h2 className="exercises-title">Exercises</h2>

                <div className="exercises-infos">
                    <div className="exercises-number"> 9 </div>
                    <div className="show-hide-icon">
                        <span> <Icon name= {` ${ openTab ? 'minus square outline' : 'plus square outline' } `} link size='small' className = 'minus-icon' /> </span>
                    </div>
                </div>
            </div>

            <div className="exercises-content" style = { { transform: `${!openTab ? 'scaleY(0)' : 'scaleY(1)'}` , transformOrigin: '100% 0%' } } >
                { allExercises.map((exercise , index) => (
                    <Exercise 
                        key = { index }
                        index = {index+1} 
                        title = {exercise.title} 
                        content = {exercise.content} 
                        downloadLink = { exercise.downloadLink } 
                    />)) } 
            </div>


        </div>

    );
}

export default Exercises;
