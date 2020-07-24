import React from 'react';

import svg from './assets/heart.svg';

import './Progress.scss';

const Progress = () => {
    return (
        <div className = 'quizz-progress-container'>

            <div className="profile-container">
                img
            </div>

            <div className="progress-wrapper">
                <div className="progress">
                    <div className="progression"></div>
                </div>
            </div>

            <div className="score-container">
                <img src={svg} alt="heart" width = "50px"/>
                <div className="score">3</div>
            </div>
        </div>
    )
}

export default Progress
