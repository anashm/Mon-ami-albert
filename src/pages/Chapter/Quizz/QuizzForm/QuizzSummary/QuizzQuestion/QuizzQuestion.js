import React from 'react';

import QuizzAnswer from './QuizzAnswer/QuizzAnswer';
import MathJax from 'react-mathjax-preview';


const QuizzQuestion = ({ title , choices , correct }) => {
    console.log(choices , correct)
    return (
        <div className = 'quizz-question'>
            <h3 className="quizz-question-title"> <MathJax math={title} /> </h3>
            {
                choices.map(( choice , index ) => {
                    console.log(correct[0] , index) 
                    return (
                        <QuizzAnswer found = { (parseInt(correct[0]) -1) === index}  text = { choice } not_the_anser = {(parseInt(correct[0]) -1) !== index} />
                    )
                } )
            }
            <div className="custom-divider"></div>
        </div>
    )
}

export default QuizzQuestion;
