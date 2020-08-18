import React , { useState , useContext } from 'react';

import { Checkbox, Form , Button } from 'semantic-ui-react';
import './QuizzForm.scss';
import UserContext from '../../../../Context/UserContext/UserContext';
import MathJax from 'react-mathjax-preview';



const QuizzForm = ({  multiple , title , choices , correct , next_step , current_index , question_limit }) => {

    const userContext = useContext(UserContext);

    const [ foundAnswer , setFoundAnswer ] = useState(0);
    const [count , setCount] = useState(0);


    const [ Response , setResponse ] = useState('');
    const [answer , setAnswer] = useState('');
    const [ loading , setLoading ] = useState(false);
    const [ showAnswer , setShowAnswer ] = useState(false);
    const [ checkAnswer , setCheckAnswer ] = useState('');


    const [ disabled , setDisabled ] = useState(false)

    const handleClick = (e , titleProps) => {
        const { checked , value , id } = titleProps;
        console.log(checked , value , e.target.value);
        setResponse(value);
        setAnswer(id);
        setCheckAnswer(value);

    }

    const handleMultipleSelectClick = (e , titleProps) => {
        const { checked , value } = titleProps;
        console.log(checked , value , e.target.value);
    }

    const handleSubmit = e => {
        e.preventDefault();
        userContext.update_user_current_question_index(current_index);
        setCount(count + 1);
        setShowAnswer(true);

        if((count) > question_limit){
            alert('that is all');
            setDisabled(true);
        }else if(count === question_limit){
            if(answer === correct){
                if(current_index <= question_limit){
                    //alert('found');$

                    setFoundAnswer(foundAnswer+1);
                    setResponse('');
                    userContext.update_user_progression((foundAnswer+1)/question_limit);
                }else{
                    alert('that is all');
                }
            }else{
                if(current_index <= question_limit){
                    setResponse('');
                    //alert('Not found');
                }else{
                    alert('that is all');
                }
            }
            setDisabled(true);
        }else{
            if(answer === correct){
                if(current_index <= question_limit){
                    //alert('found');
                    setTimeout(() => {
                        next_step(current_index + 1);
                        setShowAnswer(false);
                    } , 2000 );

                    setFoundAnswer(foundAnswer+1);
                    setResponse('');
                    userContext.update_user_progression((foundAnswer+1)/question_limit);
                }else{
                    alert('that is all');
                }
            }else{
                if(current_index <= question_limit){
                    setTimeout(() => {
                        next_step(current_index + 1);
                        setShowAnswer(false);
                    } , 2000 );
                    setResponse('');
                    //alert('Not found');
                }else{
                    //alert('that is all');
                }
            }
        }

        setAnswer('');
    }

    if(multiple){
        return (
            <div className = 'quizz-form-container'>
                <h2 className="quizz-form-title"> { title } </h2>
                <Form loading = { loading } className = 'quizz-form'  onSubmit = { e => handleSubmit(e) }>
                    {
                        choices.length > 0 ? (
                            choices.map( (choice , index) => {
                                return(
                                    <div className="response-container" key = {choice}>
                                        <Form.Field
                                            control = {Checkbox} 
                                            name = { choice } 
                                            id = { `${ index + 1 }` } 
                                            defaultChecked = { false } 
                                            label= { choice } 
                                            onClick = { (e , data) => handleMultipleSelectClick(e , data) } 
                                            value = { choice }  
                                        />
                                    </div>
                                )
                            })): null
                    }
                    <Form.Field className = 'quizz-submit-btn' control={Button}>Valider</Form.Field>

                </Form>
            </div>
        );
    }else{
        return (
            <div className = 'quizz-form-container'>
                { console.log( 'answer' , correct , answer) }

                <h2 className="quizz-form-title"> <MathJax math={title} />  </h2>
                <Form loading = { loading }  className = 'quizz-form' onSubmit = { handleSubmit }>
                    {
                        choices.length > 0 ? (
                        choices.map( (choice , index) => {
                            if(showAnswer){
                                return(
                                    <div className={`response-container ${ (correct == (index+1)) ? 'border-green' : 'border-red' } `} key = {choice}>
                                        {console.log((correct === index+1))}
                                        <Form.Field
                                            control = {Checkbox} 
                                            name = { choice } 
                                            id = { `${ index + 1 }` } 
                                            defaultChecked = { false } 
                                            label= { <label>  <MathJax math={choice} />    </label> } 
                                            onClick = { (e , data) => handleClick(e , data) } 
                                            checked = { checkAnswer ===  choice } 
                                            value = { choice } 
                                            />
                                    </div>
                                )
                            }else{

                                if(Response.length < 0){
                                    return(
                                        <div className={`response-container `} key = {choice}>
                                        
                                        <Form.Field
                                            control = {Checkbox} 
                                            name = { choice } 
                                            id = { `${ index + 1 }` } 
                                            defaultChecked = { false } 
                                            label= {  <label>  <MathJax math={choice} />    </label>  } 
                                            onClick = { (e , data) => handleClick(e , data) } 
                                            checked = { Response ===  choice } 
                                            value = { choice }
                                        />
                                        </div>
                                    )
                                }else{
                                    return(
                                        <div className={`response-container `} key = {choice}>
                                            <Form.Field
                                                control = {Checkbox} 
                                                name = { choice } 
                                                id = { `${ index + 1 }` } 
                                                defaultChecked = { false } 
                                                label= { <label>  <MathJax math={choice} />    </label> } 
                                                onClick = { (e , data) => handleClick(e , data) } 
                                                checked = { Response ===  choice } 
                                                value = { choice } 
                                                />
                                        </div>
                                    )
                                }
                            }
                        })) : null
                    }

                    <div className="quizz-submit-btn">
                        <Button  type='submit' disabled = { (Response.length === 0 ) ? true : false }>Valider</Button>
                    </div>
                </Form>
            </div>
        );
    }

}

export default QuizzForm;
