import React from 'react';

import QuizzAnswer from './QuizzAnswer/QuizzAnswer';
import MathJax from 'react-mathjax-preview';
import { MathComponent } from 'mathjax-react';


const QuizzQuestion = ({ title , choices , correct , user_bad_responses , questionIndex , quizz_questions}) => {

    return (
        <div className = 'quizz-question'>
            {console.log(title)}
            <h3 className="quizz-question-title"> <MathJax math={title} />   {/* <MathComponent tex={title} />  */} </h3>
            {
                
                choices.map(( choice , index ) => {
                    console.log( 'index' , index);
                    return (
                        <QuizzAnswer 
                            found = {(parseInt(correct[0]) -1) === index} 
                            not_found = {false} 
                            text = { choice } 
                            not_the_answer =  {false} 
                        />
                    )
                } )
            }
            <div className="custom-divider"></div>
        </div>
    )
}

export default QuizzQuestion;
