import React from 'react'
import closeIcon from '../../assets/images/close-icon.svg';
import checkIcon from '../../assets/images/check-icon.svg';
import { Icon } from 'semantic-ui-react';
import MathJax from 'react-mathjax-preview';



const QuizzAnswer = ({ found , not_the_anser , text }) => {
    return (
        <div className = 'quizz-answer'>
            <Icon name = 'circle' className = 'circle-icon' />
            <div className="check-icon"> { found ? <img src={checkIcon} alt=""/> : ( not_the_anser ? '' : <img src={closeIcon} alt=""/> ) }   </div> 

            
            <p className = { found ? 'text-green' : (not_the_anser ? '' : 'text-bold')  } > <MathJax math={text} />  </p>
        </div>
    )
}

export default QuizzAnswer;
