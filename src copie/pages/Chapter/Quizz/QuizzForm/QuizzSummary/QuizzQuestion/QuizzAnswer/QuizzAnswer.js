import React from 'react'
import closeIcon from '../../assets/images/close-icon.svg';
import checkIcon from '../../assets/images/check-icon.svg';
import { Icon } from 'semantic-ui-react';


import Latex from 'react-latex';




const QuizzAnswer = ({ found , not_the_anser , text }) => {
    return (
        <div className = 'quizz-answer'>
            <Icon name = 'circle' className = 'circle-icon' />
            <div className="check-icon"> { found ? <img src={checkIcon} alt=""/> : ( not_the_anser ? '' : <img src={closeIcon} alt=""/> ) }   </div> 
            <p className = { found ? 'text-green' : (not_the_anser ? '' : 'text-bold')  } > <Latex>{String.raw`${text}`}</Latex>  {/*  <MathJax math={text} /> */}     {/* <MathComponent tex={text} /> */} {/* <InlineMath math="\\int_0^\\infty x^2 dx"/>  */} </p>
        </div>
    )
}

export default QuizzAnswer;
