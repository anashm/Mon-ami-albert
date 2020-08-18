import React , { useContext , useEffect , useState } from 'react';

import svg from './assets/heart.svg';
import avatar from '../../../../images/avatar.png'

import './Progress.scss';

import UserContext from '../../../../Context/UserContext/UserContext';

const Progress = () => {

    const userContext = useContext(UserContext);

    const [ progression , setProgression ] = useState(0);

    const handleProgression = progression => setProgression(progression);
    
    useEffect(() => {
        handleProgression(userContext.user_progression);
    } , [userContext])



    return (
        <div className = 'quizz-progress-container'>

            <div className="profile-container">
                <img src={avatar} alt="" style = {{ maxWidth: '80px' }}/>
            </div>

            <div className="progress-wrapper">
                <div className="progress">
                    <div className="progression" style = {{ width: `${progression*100}%` }} ></div>
                </div>
            </div>

            <div className="score-container d-none">
                <img src={svg} alt="heart" width = "50px"/>
                <div className="score">3</div>
            </div>
        </div>
    )
}

export default Progress;
