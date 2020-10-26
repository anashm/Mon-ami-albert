import React , { useContext , useState , useEffect } from 'react';

import UserContext from '../../../../Context/UserContext/UserContext';

import { Icon } from 'semantic-ui-react';


const QuizzShowAnswer = () => {

    const userContext = useContext(UserContext);

    const [foundAnswer , setFoundAnswer] = useState(0);

    const handleSetFoundAnswer = number => setFoundAnswer(number);

    useEffect(() => {
        handleSetFoundAnswer(userContext.user_found_answer);
    }, [userContext.user_found_answer]);

    return (
        <div className = 'quizz-show-answer-container'>
            <div className = 'good-answer-container answer-container'>
                <Icon name = 'thumbs up' /> 
                <p> {foundAnswer} / { userContext.quizz_questions } </p>
            </div>
            <div className = 'bad-answer-container answer-container'>
                <Icon name = 'thumbs down' />
{/*                 { userContext.user_on_quizz_summary_page ? <p> { userContext.user_current_question_index  >= foundAnswer ? (userContext.user_current_question_index  - foundAnswer) : 0} / { userContext.quizz_questions } </p> :   <p> { userContext.user_current_question_index  >= foundAnswer ? (userContext.user_current_question_index  - foundAnswer) : 0} / { userContext.quizz_questions } </p>  }
 */}            
                <p> {userContext.user_not_found_answer} / {userContext.quizz_questions} </p>
            </div>
        </div>
    )
}
export default QuizzShowAnswer
