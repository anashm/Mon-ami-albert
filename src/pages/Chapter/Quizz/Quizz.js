import React from 'react';

import { Divider } from 'semantic-ui-react'
import Progress from './Progress/Progress';
import DownloadButton from './DownloadButton/DownloadButton';
import QuizzForm from './QuizzForm/QuizzForm';

import './Quizz.scss';



const Quizz = () => {
    return (
        <div className = 'quizz-container'>
            <div className="container">
                <Progress/>
                <Divider hidden />
                <DownloadButton/>
                <Divider hidden />
                <Divider hidden />
                <QuizzForm single />
                <Divider hidden />
            </div>
        </div>
    );
}

export default Quizz;
