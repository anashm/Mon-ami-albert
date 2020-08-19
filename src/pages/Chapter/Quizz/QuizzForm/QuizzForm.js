import React , { useState , useContext , useEffect } from 'react';

import { Checkbox, Form , Button, Icon } from 'semantic-ui-react';
import './QuizzForm.scss';
import UserContext from '../../../../Context/UserContext/UserContext';
import MathJax from 'react-mathjax-preview';

import {FirebaseContext} from '../../../../firebase';




const QuizzForm = ({  multiple ,
     title , 
     choices , 
     correct , 
     next_step , 
     current_index , 
     question_limit , 
     course , 
     question_length  , 
     reset , 
     resetClicked,
     chapter }) => {

    const userContext = useContext(UserContext);
    const firebase = useContext(FirebaseContext);

    const [ foundAnswer , setFoundAnswer ] = useState(0);
    const [ Response , setResponse ] = useState('');
    const [answer , setAnswer] = useState('');
    const [ loading , setLoading ] = useState(false);
    const [ showAnswer , setShowAnswer ] = useState(false);
    const [ checkAnswer , setCheckAnswer ] = useState('');
    const [ disabled , setDisabled ] = useState(false);
    const [ userPoints , setUserPoints ] = useState(50);


    const database = firebase.getData();


    useEffect(() => {
        firebase.auth.onAuthStateChanged( user => {
            if(user){
                //code if realod page pour garder context api values
                userContext.get_connected_user(user);
                const userId = user.uid;                      
                const reference =  database.ref(`${userContext.user_informations.level}/${course}/progression`);


                if(userContext.user_informations){
                    //console.log('hello')
                    reference.once("value", user_informations => {
                        //console.log(user_informations.val())
                        const { current_question_index , found_questions, points } = user_informations.val();
                        console.log(question_limit , current_question_index , found_questions , points);

                        setUserPoints(points);
                        //update user context progress
                        userContext.update_user_progression(found_questions/question_length);
                        //update current index
                        userContext.update_user_current_question_index(current_question_index);
                        //update user points
                        userContext.update_user_points(points);
                    });

                }
            }
            else{
                console.log('not login');
            }
            });
            
    }, [firebase]);

    const handleResetButton = () => {
        //alert('hello')

        const reference =  database.ref(`users/${userContext.user.uid}/Progression/`);
        console.log(reference)
        reference.child(`${userContext.user_informations.level}/${course}/${chapter}/progression`).update({
            current_question_index:  0,
            found_questions :  0,
            points:  50
        }).then(() => {
             //update user context progress
            userContext.update_user_progression(0);
             //update current index
            userContext.update_user_current_question_index(0);
             //update user points
            userContext.update_user_points(50);
            setFoundAnswer(0);
            setUserPoints(50);
            resetClicked();
        })
        .catch(e => console.log(e));
        //console.log(userContext.user_informations.level)
    }




    const handleClick = (e , titleProps) => {
        const { checked , value , id } = titleProps;
        console.log(checked , value , e.target.value);
        setResponse(value);
        setAnswer(id);
        setCheckAnswer(value);

    }

    const handleMultipleSelectClick = (e , titleProps) => {
        const { checked , value } = titleProps;
    }




    const handleSubmit = e => {
        e.preventDefault();
        /*userContext.update_user_current_question_index(current_index);
        setCount(count + 1);
        setShowAnswer(true);*/

        console.log(question_length , question_limit , current_index);

        if(current_index < question_limit){

            userContext.update_user_current_question_index(current_index + 1);

            if(answer === correct){
                setShowAnswer(true);
                alert('found');
                setFoundAnswer(foundAnswer+1);
                setUserPoints(userPoints+10);
                setResponse('');


                userContext.update_user_progression((foundAnswer+1)/question_length);
                userContext.update_user_points(userPoints+10);


                if(userContext.user){
                    const reference =  database.ref(`users/${userContext.user.uid}/Progression/`);
                    console.log(reference)
                    reference.child(`${userContext.user_informations.level}/${course}/${chapter}/progression`).set({
                        current_question_index: current_index + 1,
                        found_questions : foundAnswer + 1,
                        points: userPoints + 10
                    }).then(() => {
                        setShowAnswer(false);
                        next_step(current_index + 1);
                    })
                    .catch(e => console.log(e));
                    //console.log(userContext.user_informations.level)
                }

            }else{
                setShowAnswer(true);
                setResponse('');
                alert('Not found');

                const reference =  database.ref(`users/${userContext.user.uid}/Progression/`);
                console.log(reference)
                reference.child(`${userContext.user_informations.level}/${course}/${chapter}/progression`).set({
                    current_question_index: current_index + 1,
                }).then(() => {
                    setShowAnswer(false);
                    next_step(current_index + 1);
                    setResponse('');
                })
                .catch(e => console.log(e));
                //console.log(userContext.user_informations.level)

            }
            setDisabled(true);



        }
        //test for last question
        else if(current_index === question_limit) {

            if(answer === correct){
                alert('found');
                //alert('found');$
                setShowAnswer(true);

                setFoundAnswer(foundAnswer+1);
                setUserPoints(userPoints+10);
                setResponse('');

                userContext.update_user_progression((foundAnswer+1)/question_length);
                userContext.update_user_points(userPoints+10);

                if(userContext.user){
                    const reference =  database.ref(`users/${userContext.user.uid}/Progression/`);
                    console.log(reference)
                    reference.child(`${userContext.user_informations.level}/${course}/${chapter}/progression`).set({
                        current_question_index: current_index + 1,
                        found_questions : foundAnswer + 1,
                        points: userPoints + 10
                    }).then(() => {
                        setShowAnswer(false);
                        next_step(current_index + 1);
                    })
                    .catch(e => console.log(e));
                    //console.log(userContext.user_informations.level)
                }

            }else{
                setResponse('');
                setShowAnswer(true);
                alert('Not found');
                if(userContext.user){
                    const reference =  database.ref(`users/${userContext.user.uid}/Progression/`);
                    console.log(reference)
                    reference.child(`${userContext.user_informations.level}/${course}/${chapter}/progression`).update({
                        current_question_index: current_index + 1,
                    }).then(() => {
                        setShowAnswer(false);
                        next_step(current_index + 1);
                        setResponse('');
                    })
                    .catch(e => console.log(e));
                    //console.log(userContext.user_informations.level)
                }
            }
            setDisabled(true);

        }else{

            alert('that is all');
        }

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

                { !reset && <h2 className="quizz-form-title"> <MathJax math={title} />  </h2>}


                { !reset && 

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
                
                }

                { reset &&

                    <div className="quizz-submit-btn">
                        <Button  type='button' onClick = { handleResetButton }> <Icon name = 'redo' /> </Button>
                    </div>
                    
                }

            </div>
        );
    }

}

export default QuizzForm;
