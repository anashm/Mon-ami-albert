import React , { useContext , useEffect , useState , Fragment , useCallback} from 'react';

import { Divider } from 'semantic-ui-react'
import Progress from './Progress/Progress';
import DownloadButton from './DownloadButton/DownloadButton';
import QuizzForm from './QuizzForm/QuizzForm';
import QuizzShowAnswer from './QuizzShowAnswer/QuizzShowAnswer';

import { Dimmer, Loader, Segment } from 'semantic-ui-react'


import './Quizz.scss';

import {FirebaseContext} from '../../../firebase';
import UserContext from '../../../Context/UserContext/UserContext';
import { useHistory } from "react-router-dom";

import { Alert } from 'react-bootstrap';




const Quizz = ({ match }) => {

    let matiere =  match.params.matieres;
    let chapitre = match.params.chapitre;

    //console.log(match)
    const firebase = useContext(FirebaseContext);
    const userContext = useContext(UserContext);
    const history = useHistory()

    //console.log(firebase);
    //console.log(userContext);

    const [quizzQuestions , setQuizzQuestions] = useState([]);
    const [ currentIndex , setCurrentIndex ] = useState(0);
    const [loading , setLoading] = useState(true);





    const handleCurrentIndex = index => setCurrentIndex(index);

    const handleQuizzQuestions = quizzQuestions => {

        if(quizzQuestions){
            const newQuizz = quizzQuestions.questions.map(quizzQuestion => {
                const questions = quizzQuestion.choices.split("#");
                return [{
                    ...quizzQuestion,
                    choices: questions
                }]
            });
            userContext.update_quizz_questions(newQuizz.length);
            setQuizzQuestions(newQuizz);
            setLoading(false);
        }else{
            setQuizzQuestions([]);
            setLoading(false)
        }
    };


    useEffect(() => {

        //console.log( 'final test' , userContext.user_current_question_index);

        if(userContext.user_current_question_index >= 0){
            handleCurrentIndex(userContext.user_current_question_index);
        }

        if(userContext.user_informations && userContext.user){
                //code if realod page pour garder context api values
                userContext.update_user_playing_quizz(true);
                //console.log(reference);

                if(quizzQuestions.length < 1){
                    const userId = userContext.user.uid;                      
                    const database = firebase.getData();
                    //console.log(userId);
                    const reference =  database.ref(`users/${userId}`);
                    reference.once("value", user_informations => {
                        userContext.get_user_informations(user_informations.val());
                        const reference_exercices = database.ref(`schoolLevels/${user_informations.val().level}/subjects/${matiere}/${chapitre}/quiz`);
                        reference_exercices.once("value", quizz => {
                            handleQuizzQuestions(quizz.val());
                        });
                    });
                }
        }

        return () => {
            userContext.update_user_playing_quizz(false)
        }

    } , [ userContext.user_current_question_index , userContext.user_informations]);


    if(userContext.user){
        return (
            <div className = 'quizz-container'>
                <div className="container">

                    { (quizzQuestions.length !== 0 && !loading) && (
                        <Fragment>
                            <Progress/>
                            {/*<DownloadButton/>*/}                            
                        </Fragment>
                    )
                    }


                    <div className={`loader-container ${ loading ? '' : 'd-none' }`} style = {{ height: '30vh' , position: 'relative' }}>
                        <Dimmer active inverted>
                            <Loader inverted content='Chargement en cours  ...' />
                        </Dimmer>
                    </div>

                    { quizzQuestions.length > 0 &&
                         <Fragment>
                            <QuizzShowAnswer />

                            <QuizzForm single 
                                title = {` ${quizzQuestions[currentIndex] ? quizzQuestions[currentIndex][0].question : 'quizzQuestions' } ` } 
                                choices = {quizzQuestions[currentIndex] ? quizzQuestions[currentIndex][0].choices : []} 
                                correct = {quizzQuestions[currentIndex] ? quizzQuestions[currentIndex][0].correct[0] : []}
                                current_index = { currentIndex }
                                question_limit = { quizzQuestions.length ? quizzQuestions.length - 1 : 0  }
                                question_length = { quizzQuestions.length ? quizzQuestions.length : 0  }
                                course = {matiere}
                                chapter = {chapitre}
                                quizz_questions = {quizzQuestions}
                            />
                          </Fragment>
                        
                    }

                    { (quizzQuestions.length === 0 && !loading) &&
                        <Alert variant= 'secondary'>
                            No Quizz
                        </Alert>
                    }
                    
                    <Divider hidden />
                </div>
            </div>
        );
    }else{
        return(
            <div style = {{ position: 'fixed' , top: '0' , left: '0' , zIndex: '100000', width: '100vw' , height: '100vh' }}>
                <Segment style = {{ height: '100%' }}>
                    <Dimmer active inverted>
                        <Loader inverted content='Preparing session' />
                    </Dimmer>
                </Segment>
            </div>
        )
    }
}

export default Quizz;
