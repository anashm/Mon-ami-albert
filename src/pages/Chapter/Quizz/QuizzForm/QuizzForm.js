import React , { useState } from 'react';

import { Checkbox, Form , Button } from 'semantic-ui-react';

import './QuizzForm.scss';

const QuizzForm = ({ single , multiple , title , choices , correct , next_step , current_index , question_limit }) => {

    console.log(next_step , current_index)

    const [ Response , setResponse ] = useState('');
    const [answer , setAnswer] = useState('');
    const [ loading , setLoading ] = useState(false);

    const handleClick = (e , titleProps) => {
        const { checked , value , id } = titleProps;
        console.log(checked , value , e.target.value);
        setResponse(value);
        setAnswer(id);

    }

    const handleMultipleSelectClick = (e , titleProps) => {
        const { checked , value } = titleProps;
        console.log(checked , value , e.target.value);
    }

    const handleSubmit = e => {
        e.preventDefault();
        console.log(Response);

        if(answer === correct){
            alert('found');

            if(current_index < question_limit){
                next_step(current_index + 1);
            }else{
                alert('that is all');
            }
        }else{
            alert('try again');
        }


    }


    const responses = [
        {
            name: 'r1',
            id: 'r1',
            label: 'Si le dénominateur est un entier.',
            value: 'r1'
        },
        {
            name: 'r2',
            id: 'r2',
            label: 'Si le dénominateur est un entier.',
            value: 'r2'
        },
        {
            name: 'r3',
            id: 'r3',
            label: 'Si le dénominateur est un entier.',
            value: 'r3'
        },
        {
            name: 'r4',
            id: 'r4',
            label: 'Si le dénominateur est un entier.',
            value: 'r4'
        }
    ];

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
                <h2 className="quizz-form-title"> { title } </h2>
                <Form loading = { loading }  className = 'quizz-form' onSubmit = { handleSubmit }>
                    {
                        choices.length > 0 ? (
                        choices.map( (choice , index) => {
                            if(Response.length < 0){
                                return(
                                    <div className="response-container" key = {choice}>
                                    
                                    <Form.Field
                                        control = {Checkbox} 
                                            name = { choice } 
                                            id = { `${ index + 1 }` } 
                                            defaultChecked = { false } 
                                            label= { choice } 
                                            onClick = { (e , data) => handleClick(e , data) } 
                                            checked = { Response ===  choice } 
                                            value = { choice } 
                                             />
                                    </div>
                                )
                            }else{
                                return(
                                    <div className="response-container" key = {choice}>
                                    
                                        <Form.Field
                                        control = {Checkbox} 
                                            name = { choice } 
                                            id = { `${ index + 1 }` } 
                                            defaultChecked = { false } 
                                            label= { choice } 
                                            onClick = { (e , data) => handleClick(e , data) } 
                                            checked = { Response ===  choice } 
                                            value = { choice } 
                                            />
                                    </div>
                                )
                            }
                        })) : null
                    }

                    <Form.Field className = 'quizz-submit-btn' control={Button}>Valider</Form.Field>

                </Form>
            </div>
        );
    }

}

export default QuizzForm;
