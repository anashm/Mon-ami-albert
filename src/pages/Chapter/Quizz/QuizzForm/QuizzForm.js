import React , { useState , useContext , useEffect , Fragment } from 'react';

import { Checkbox, Form , Button, Icon } from 'semantic-ui-react';
import { Modal } from 'react-bootstrap';

import './QuizzForm.scss';
import UserContext from '../../../../Context/UserContext/UserContext';
import MathJax from 'react-mathjax-preview';

import {FirebaseContext} from '../../../../firebase';

import Lottie from 'react-lottie';
import * as animationData from '../../../../animation/quizz/test.json';

import QuizzSummary from './QuizzSummary/QuizzSummary';



const EndModal = props => (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            {console.log('nzaou props' , props)}
            <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
                score
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>
<<<<<<< HEAD
                <p> Total Gained Points : {props.points} <i> ( you found { props.found_answer } questions out of { props.total_questions }  )  </i> </p>
                <p> Quizz Chapter Progression : { props.progress * 100 } % </p>
=======

                <p> Total Gained Points : {props.points} <i> ( you found { props.found_answer } questions out of { props.total_questions }  )  </i> </p>
                <p> Quizz Chapter Progression : { props.progress * 100 } % </p>

>>>>>>> d08aea3194ac6f0a744b030086eb994101f6d75a
            <h4>Centered Modal</h4>
            <p>
                {props.modalText}
            </p>
<<<<<<< HEAD
=======

>>>>>>> d08aea3194ac6f0a744b030086eb994101f6d75a
            </Modal.Body>
        </Modal>
)


const QuizzForm = ({  multiple ,
    title , 
    choices , 
    correct , 
    next_step , 
    current_index , 
    question_limit , 
    course , 
    question_length  , 
    chapter, 
    resetClicked
     }) => {

    const userContext = useContext(UserContext);
    const firebase = useContext(FirebaseContext);

    const [ foundAnswer , setFoundAnswer ] = useState(0);
    const [ Response , setResponse ] = useState('');
    const [answer , setAnswer] = useState('');
    const [ loading , setLoading ] = useState(false);
    const [ showAnswer , setShowAnswer ] = useState(false);
    const [ checkAnswer , setCheckAnswer ] = useState('');
    const [ userPoints , setUserPoints ] = useState(0);
    const [ finished , setFinished ] = useState(false);
    const [ reset , setReset ] = useState(false);
    const [modalShow, setModalShow] = React.useState(true);
    const [ modalText,setModalText] = useState('');
    const [showNextBtn , setShowNextBtn] = useState(false);


    const database = firebase.getData();

    useEffect(() => {

        firebase.auth.onAuthStateChanged( user => {
            if(user){
                //code if realod page pour garder context api values
                userContext.get_connected_user(user);

                const userId = user.uid;                      
                const reference =  database.ref(`users/${userId}/Progression/${userContext.user_informations.level}/${course}/${chapter}`);

                reference.once("value", user_informations => {
                    //console.log(user_informations.val())
                    console.log(!user_informations.val());
                    if(!user_informations.val()){
                        console.log('we must create a collection');
                        reference.child(`/progression`).set({
                            current_question_index:  0,
                            found_questions : 0,
                            points: 0,
                            finished: false,
                            onReset: false
                        }).then(() => {
                            console.log('created');
                            setFoundAnswer(0);
                            setUserPoints(0);
                            userContext.update_user_progression(0);
                            //update current index
                            userContext.update_user_current_question_index(0);
                            //update user points
                            userContext.update_user_points(0);
                        })
                        .catch(e => console.log(e));
                        //console.log(userContext.user_informations.level)
                    }else{
                        const reference =  database.ref(`users/${userId}/Progression/${userContext.user_informations.level}/${course}/${chapter}/progression`);
                        reference.once('value' , user_informations => {
                             //console.log(user_informations.val())
                            const { current_question_index , found_questions , points , finished , onReset } = user_informations.val();
                            console.log( 'from quizz form' , question_limit , current_question_index , found_questions , points , finished);
                            userContext.update_user_progression((current_question_index+1)/question_length);
                            //update current index
                            //update user points
                            userContext.update_user_current_question_index(current_question_index);
                            userContext.update_user_points(points);
                            setFoundAnswer(found_questions);
                            setUserPoints(points);
                            setReset(onReset);

                            if(finished){
                                setFinished(finished);
                            }
                        });
                    }

                });
            }
        
        });
    } , [firebase]);

    const handleResetButton = () => {
        //alert('hello')

        const reference =  database.ref(`users/${userContext.user.uid}/Progression/`);
        console.log(reference)
        reference.child(`${userContext.user_informations.level}/${course}/${chapter}/progression`).update({
            current_question_index:  0,
            found_questions : 0,
        }).then(() => {
             //update user context progress
            userContext.update_user_progression(0);
             //update current index
            userContext.update_user_current_question_index(0);
             //update user points
            setFoundAnswer(0);
            resetClicked();
            setReset(false);
            setShowAnswer(false);
            userContext.update_user_check_true_answer(false);
            userContext.update_user_checked_false_answer(false);
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

    const handleNextButtonClick = () => {
        console.log('hello');
        setLoading(true);


        if(current_index < question_limit){


            if(answer === correct){
                setShowAnswer(true);
                userContext.update_user_check_true_answer(true);
                userContext.update_user_checked_false_answer(false);
                //alert('found');
                setFoundAnswer(foundAnswer+1);

                if(userContext.user){
                    let score = 0;

                    if( !finished && ( ((foundAnswer+1)/question_length) <= 0.25) ){
                        userContext.update_user_points(0);
                        setUserPoints(0);
                        score = 0;
                    }
    
                    if( !finished &&  (((foundAnswer+1)/question_length) > 0.25 && ((foundAnswer+1)/question_length) <= 0.5 )){
                        userContext.update_user_points(20);
                        setUserPoints(20);
                        score = 20;

                    }
    
    
                    if( !finished && (((foundAnswer+1)/question_length) > 0.5 && ((foundAnswer+1)/question_length) <= 0.75) ){
                        userContext.update_user_points(40);
                        setUserPoints(40);
                        score = 40;
                    }
    
                    if( !finished && (((foundAnswer+1)/question_length) > 0.75 && ((foundAnswer+1)/question_length) <= 1 )){
                        userContext.update_user_points(60);
                        setUserPoints(60);
                        score = 60;
                    }

                    if(finished){
                        score = userPoints;
                    }


                    const reference =  database.ref(`users/${userContext.user.uid}/Progression/`);
                    console.log(reference)
                    reference.child(`${userContext.user_informations.level}/${course}/${chapter}/progression`).update({
                        current_question_index: current_index + 1,
                        found_questions : foundAnswer + 1,
                        points: score,
                        onReset: false
                    }).then(() => {
                        setResponse('');
                        setShowNextBtn(true);
                        setLoading(false);
                        userContext.update_user_progression((current_index+2)/question_length);
                        userContext.update_user_current_question_index(current_index+1);
                        userContext.update_user_check_true_answer(false);
                        userContext.update_user_checked_false_answer(false);
                        setShowAnswer(false);
                        setShowNextBtn(false);
                    })
                    .catch(e => console.log(e));
                    //console.log(userContext.user_informations.level)
                }
                
            }

            if(answer !== correct){
                setShowAnswer(true);
                //alert('Not found');
                userContext.update_user_check_true_answer(false);
                userContext.update_user_checked_false_answer(true);

                const reference =  database.ref(`users/${userContext.user.uid}/Progression/`);
                console.log(reference)
                reference.child(`${userContext.user_informations.level}/${course}/${chapter}/progression`).update({
                    current_question_index: current_index + 1,
                    onReset: false
                }).then(() => {
                    setShowNextBtn(true);
                    setResponse('');
                    setLoading(false);
                    userContext.update_user_progression((current_index+2)/question_length);
                    userContext.update_user_current_question_index(current_index+1);
                    userContext.update_user_check_true_answer(false);
                    userContext.update_user_checked_false_answer(false);
                    setShowAnswer(false);
                    setShowNextBtn(false);
                })
                .catch(e => console.log(e));
                //console.log(userContext.user_informations.level)
            }

        }
        
        
        if(current_index === question_limit){

            if(answer === correct){
                setShowAnswer(true);
                //alert('found');
                userContext.update_user_check_true_answer(true);
                userContext.update_user_checked_false_answer(false);
                setFoundAnswer(foundAnswer+1);

                if(userContext.user){
                    let score = 0;

                    if( !finished && ( ((foundAnswer+1)/question_length) <= 0.25) ){
                        userContext.update_user_points(0);
                        setUserPoints(0);
                        score = 0;
                        setModalText('partie1')
                    }
    
                    if( !finished &&  (((foundAnswer+1)/question_length) > 0.25 && ((foundAnswer+1)/question_length) <= 0.5 )){
                        userContext.update_user_points(20);
                        setUserPoints(20);
                        score = 20;
                        setModalText('partie2')
                    }
    
                    if( !finished && (((foundAnswer+1)/question_length) > 0.5 && ((foundAnswer+1)/question_length) <= 0.75) ){
                        userContext.update_user_points(40);
                        setUserPoints(40);
                        score = 40;
                        setModalText('partie3')
                    }
    
                    if( !finished && (((foundAnswer+1)/question_length) > 0.75 && ((foundAnswer+1)/question_length) <= 1 )){
                        userContext.update_user_points(60);
                        setUserPoints(60);
                        score = 60;
                        setModalText('partie4')
                    }

                    if(finished){
                        score = userPoints;
                    }


                    const reference =  database.ref(`users/${userContext.user.uid}/Progression/`);
                    console.log(reference);
                    reference.child(`${userContext.user_informations.level}/${course}/${chapter}/progression`).update({
                        found_questions : foundAnswer + 1,
                        points: score,
                        finished: true,
                        onReset: true
                    }).then(() => {
                        setResponse('');
                        setReset(false);
                    })
                    .catch(e => console.log(e));
                    //console.log(userContext.user_informations.level)
                }
            }

            if(answer !== correct){
                setShowAnswer(true);
                userContext.update_user_check_true_answer(false);
                userContext.update_user_checked_false_answer(true);
                //alert('Not found');
                if(userContext.user){
                    const reference =  database.ref(`users/${userContext.user.uid}/Progression/`);
                    console.log(reference)
                    reference.child(`${userContext.user_informations.level}/${course}/${chapter}/progression`).update({
                        finished: true,
                        onReset: true
                    }).then(() => {
                        setResponse('');
                        setReset(false);
                    })
                    .catch(e => console.log(e));
                    //console.log(userContext.user_informations.level)
                }
            }

        }


        if(current_index > question_limit){
            alert('you cannot play again')
        }

    }




    const handleSubmit = e => {
        e.preventDefault();
        /*userContext.update_user_current_question_index(current_index);
        setCount(count + 1);
        setShowAnswer(true);*/
        //console.log(question_length , question_limit , current_index);


        console.log('hello');


        if(current_index < question_limit){


            if(answer === correct){
                setShowAnswer(true);
                userContext.update_user_check_true_answer(true);
                userContext.update_user_checked_false_answer(false);
                //alert('found');
                //console.log(userContext.user_informations.level)
            }

            if(answer !== correct){
                setShowAnswer(true);
                //alert('Not found');
                userContext.update_user_check_true_answer(false);
                userContext.update_user_checked_false_answer(true);
            }

        }
        
        
        if(current_index === question_limit){

            if(answer === correct){
                setShowAnswer(true);
                //alert('found');
                userContext.update_user_check_true_answer(true);
                userContext.update_user_checked_false_answer(false);
                setFoundAnswer(foundAnswer+1);
            }

            if(answer !== correct){
                setShowAnswer(true);
                userContext.update_user_check_true_answer(false);
                userContext.update_user_checked_false_answer(true);
                //alert('Not found');
            }

        }


        if(current_index > question_limit){
            alert('you cannot play again')
        }

        setShowNextBtn(true);
    }

    


        return (

            <Fragment>

            { !reset &&
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

                    { !showNextBtn ? 
                        <div className="quizz-submit-btn">
                            <Button  type='submit' disabled = { (Response.length === 0 ) ? true : false }>Valider</Button>
                        </div>
                        :
                        <div className="quizz-submit-btn">
                            <Button  type='button' onClick = {  handleNextButtonClick }> next <Icon name = 'long arrow alternate right' /> </Button>
                        </div>
                    }
                   



                    

                    </Form>

                </div>
                
            }

            { reset &&
                <Fragment >

<<<<<<< HEAD
                    <QuizzSummary />
=======
                    <EndModal
                        points = {userContext.user_points}
                        progress = { userContext.user_progression }
                        total_questions = { userContext.user_current_question_index + 1 }
                        found_answer = { foundAnswer }
                        show={modalShow}
                        onHide={() => setModalShow(false)} />



                    <Fragment >
                        <EndModal
                         show={modalShow}
                         modalText = {modalText}
                         onHide={() => setModalShow(false)} />
                        <div className="quizz-submit-btn">
                            <Button  type='button' onClick = { handleResetButton }> <Icon name = 'redo' /> </Button>
                        </div>
                    </Fragment>

                    
                    
                    <div className="quizz-submit-btn">
                        <Button  type='button' onClick = { handleResetButton }> <Icon name = 'redo' /> </Button>
                    </div>
                </Fragment>
>>>>>>> d08aea3194ac6f0a744b030086eb994101f6d75a

                </Fragment>
            }
            </Fragment>



        );

}

export default QuizzForm;
