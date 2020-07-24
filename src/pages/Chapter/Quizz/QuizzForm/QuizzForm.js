import React , { useState } from 'react';

import { Checkbox, Form , Button } from 'semantic-ui-react';

import './QuizzForm.scss';

const QuizzForm = ({ single , multiple }) => {

    const [ Response , setResponse ] = useState('');
    const [ Responses , setResponses ] = useState([]);
    const [ loading , setLoading ] = useState(false);

    const handleClick = (e , titleProps) => {
        const { checked , value } = titleProps;
        console.log(checked , value , e.target.value);
        setResponse(value);
    }

    const handleMultipleSelectClick = (e , titleProps) => {
        const { checked , value } = titleProps;
        console.log(checked , value , e.target.value);
    }

    const handleSubmit = e => {
        e.preventDefault();
        console.log(Response);
        setLoading(true)
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
                <h2 className="quizz-form-title"> Dans quel cas une écriture fractionnaire est-elle une fraction ? </h2>
                <Form loading = { loading } className = 'quizz-form'  onSubmit = { e => handleSubmit(e) }>
                    {
                        responses.map(response => {
                            return(
                                <div className="response-container">
                                
                                <Form.Field
                                    control = {Checkbox} 
                                    name = { response.name } 
                                    id = { response.id } 
                                    defaultChecked = { false } 
                                    label= { response.label } 
                                    onClick = { (e , data) => handleMultipleSelectClick(e , data) } 
                                    value = { response.value }  />
                                </div>
                            )
                        })
                    }
                    <Form.Field className = 'quizz-submit-btn' control={Button}>Valider</Form.Field>

                </Form>
            </div>
        );
    }else{
        return (
      
            <div className = 'quizz-form-container'>
                <h2 className="quizz-form-title"> Dans quel cas une écriture fractionnaire est-elle une fraction ? </h2>
                <Form loading = { loading }  className = 'quizz-form' onSubmit = { handleSubmit }>
                    {
                        responses.map(response => {
                            if(Response.length < 0){
                                return(
                                    <div className="response-container">
                                    
                                    <Form.Field
                                        control = {Checkbox} 
                                            name = { response.name } 
                                            id = { response.id } 
                                            defaultChecked = { false } 
                                            label= { response.label } 
                                            onClick = { (e , data) => handleClick(e , data) } 
                                            checked = { Response ===  response.value } 
                                            value = { response.value }  />
                                    </div>
                                )
                            }else{
                                return(
                                    <div className="response-container">
                                    
                                        <Form.Field
                                        control = {Checkbox} 
                                            name = { response.name } 
                                            id = { response.id } 
                                            defaultChecked = { false } 
                                            label= { response.label } 
                                            onClick = { (e , data) => handleClick(e , data) } 
                                            checked = { Response ===  response.value } 
                                            value = { response.value }  />
                                    </div>
                                )
                            }
                        })
                    }

                    <Form.Field className = 'quizz-submit-btn' control={Button}>Valider</Form.Field>

                </Form>
            </div>
        );
    }

}

export default QuizzForm;
