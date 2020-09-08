import React , { useContext , useEffect , useState , Fragment , useRef } from 'react';
import UserContext from '../../../../Context/UserContext/UserContext';
import { Icon } from 'semantic-ui-react'
import Lottie from "lottie-react";

import './Progress.scss';


import svg from './assets/Groupe 212.svg';
import avatar from './assets/Boy.png'
import lottieTrophy from './assets/lottie/trophy.json';





const Progress = () => {

    const lottieRef = useRef();


    const userContext = useContext(UserContext);

    const [ progression , setProgression ] = useState(0);
    const [ quizzQuestionsNumber , setQuizzQuestionsNumber ] = useState(0);
    const [currentIndex , setCurrentIndex] = useState(0);
    const [playLottie , setPlayLottie] = useState(false);

    const[avatarImage,setAvatarImage] = useState('')
    const handleProgression = progression => setProgression(progression);
    const handleSetQuizzQuestionsNumber = number => setQuizzQuestionsNumber(number);
    const handleSetCurrentIndex = index => setCurrentIndex(index);

   
    
    useEffect(() => {
        /*  if(!userContext.user_check_true_answer && !userContext.user_checked_false_answer){
            setTimeout(() => {lottieRef.current.pause() }, 1800);
        }
        if(userContext.user_check_true_answer){
            setTimeout(() => {lottieRef.current.pause() }, 1800);
        } */
        console.log('ici '+userContext.user_informations.avatar)

        setAvatarImage(userContext.user_informations.avatar)

        handleProgression(userContext.user_progression);
        handleSetQuizzQuestionsNumber(userContext.quizz_questions);
        handleSetCurrentIndex(userContext.user_current_question_index);

    } , [userContext.user_progression , userContext.quizz_questions , userContext.user_current_question_index , userContext.user_check_true_answer])



    return (
        <div className = 'quizz-progress-container'>

            <div className="profile-container">
                { avatarImage ? <img src={require(`../../../../images/avatars/${avatarImage}.png`)} style = {{ maxWidth: '80px' }} alt = '' /> : <img src={avatar} alt="" style = {{ maxWidth: '80px' }}/>}
                
            </div>

            <div className="progress-wrapper">
                <div className="answer-wrapper">
                    <div className = 'empty'></div>
                    <p className= { `${userContext.user_checked_false_answer ? 'text-red shake-horizontal' : ''} ${userContext.user_check_true_answer ? 'text-green bounce-top' : ''}` } >  
                        {userContext.user_checked_false_answer &&  <Fragment> <Icon name = 'thumbs down' />   Mauvaise réponse </Fragment>    } 
                        {userContext.user_check_true_answer &&  <Fragment> <Icon name = 'thumbs up' />  Bonne réponse  </Fragment>    } 
                    </p>
                    <p className="questions-repo text-center"> {currentIndex+1} / { quizzQuestionsNumber } </p> 
                    { /* ( !userContext.user_check_true_answer && !userContext.user_checked_false_answer) &&  <p className="questions-repo text-center w-100">{currentIndex+1}/{quizzQuestionsNumber} </p> */ }
                </div>

                <div className="progress">
                    <div className="progression" style = {{ width: `${progression*100}%` }} ></div>
                </div>
            </div>

            <div className="score-container">
                <img src={svg} alt="heart" width = "50px"/>
                {/* <div className="score"> { userContext.user_points } </div>*/} 
                { /*!userContext.user_check_true_answer && <Lottie lottieRef={lottieRef} animationData={lottieTrophy}  /> */}
                {/*userContext.user_check_true_answer &&  <Lottie lottieRef={lottieRef}   animationData={lottieTrophy} />*/}
            </div>
        </div>
    )
}

export default Progress;
