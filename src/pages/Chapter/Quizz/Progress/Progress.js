import React , { useContext , useEffect , useState , Fragment } from 'react';

import svg from './assets/Groupe 212.svg';
import avatar from './assets/Boy.png'

import { Icon } from 'semantic-ui-react'

import './Progress.scss';

import UserContext from '../../../../Context/UserContext/UserContext';

const Progress = () => {

    const userContext = useContext(UserContext);

    const [ progression , setProgression ] = useState(0);
    const [ quizzQuestionsNumber , setQuizzQuestionsNumber ] = useState(0);
    const [currentIndex , setCurrentIndex] = useState(0);

    const handleProgression = progression => setProgression(progression);
    const handleSetQuizzQuestionsNumber = number => setQuizzQuestionsNumber(number);
    const handleSetCurrentIndex = index => setCurrentIndex(index);
    
    useEffect(() => {
        handleProgression(userContext.user_progression);
        handleSetQuizzQuestionsNumber(userContext.quizz_questions);
        handleSetCurrentIndex(userContext.user_current_question_index);

    } , [userContext.user_progression , userContext.quizz_questions , userContext.user_current_question_index])



    return (
        <div className = 'quizz-progress-container'>

            <div className="profile-container">
                <img src={avatar} alt="" style = {{ maxWidth: '80px' }}/>
            </div>

            <div className="progress-wrapper">
                
                <div className="answer-wrapper">

                    { userContext.user_checked_false_answer && ( 
                        <Fragment>
                            <div className = 'empty'></div>
                            <p className="text-red"> <Icon name = 'thumbs down' />  Mauvaise réponse </p>
                            <p className="questions-repo text-center"> {currentIndex+1} / { quizzQuestionsNumber } </p> 
                        </Fragment>) 
                    }

                    { userContext.user_check_true_answer && 
                        <Fragment>
                            <div className = 'empty'></div>
                            <p className="text-green"> <Icon name = 'thumbs up' />  Bonne réponse </p>
                            <p className="questions-repo text-center"> {currentIndex+1} / { quizzQuestionsNumber } </p> 
                        </Fragment>
                    }

                    { ( !userContext.user_check_true_answer && !userContext.user_checked_false_answer) &&  <p className="questions-repo text-center w-100">{currentIndex+1}/{quizzQuestionsNumber} </p> }

                   
                </div>

                <div className="progress">
                    <div className="progression" style = {{ width: `${progression*100}%` }} ></div>
                </div>
            </div>

            <div className="score-container">
                <img src={svg} alt="heart" width = "50px"/>
                <div className="score">3</div>
            </div>
        </div>
    )
}

export default Progress;
