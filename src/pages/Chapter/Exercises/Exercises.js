import React , { useState,useEffect,useContext, useCallback } from 'react';
import { Dimmer, Icon, Loader } from 'semantic-ui-react';
import Exercise from './Exercise/Exercise';
import exercises from './ex';
import './Exercises.scss';
import { useHistory, useParams } from "react-router-dom";
import {FirebaseContext} from '../../../firebase';
import UserContext from '../../../Context/UserContext/UserContext';
import { convertText } from '../../../utils/functions';



const Exercises = ({urlParams}) => {

    const refs = React.createRef();
    
    
    var matiere =  urlParams.matieres;
    var chapitre = urlParams.chapitre;
    const {level , course , chapter } = useParams();


    const firebase = useContext(FirebaseContext)
    const userContext = useContext(UserContext)
   // const [infosLevel , setinfosLevel ] = useState(null)
    //const [ chapitresTitle , setChapitresTitle ] = useState([])

    const [ exercices , setExercices ] = useState([]);
    const [ chapterExercisesLoading , setChapterExercisesLoading ] = useState(true); 
    const [ allExercises , setAllExercises ] = useState([])

    const history = useHistory();

    const fetchChapterCourse = useCallback(async () => {
        try {
            setChapterExercisesLoading(true);
            const database = firebase.getData();
            const chapterCourseRef = database.ref('schoolLevels/'+level+'/subjects/'+course+'/'+chapter+'/exercices');
            const chapterExercises = await chapterCourseRef.once("value");
            const allChapterExercises = chapterExercises.val();
            if(allChapterExercises){

                const finalData = Object.entries(allChapterExercises).map( ([ id , data ]) => ({
                    id,
                    ...data
                }))
                console.log(finalData)
                setAllExercises( finalData  || []);
            }
            setChapterExercisesLoading(false);

            
        } catch (error) {
            console.log(error);
            setChapterExercisesLoading(false);
        }
    } , [level , course , chapter , firebase])


    useEffect(() => {

        // if(userContext.user && userContext.user_informations){
        //     const database = firebase.getData();
        //     if(exercices.length < 1){
        //         const reference_exercices = database.ref('schoolLevels/'+userContext.user_informations.level+'/subjects/'+matiere+'/'+chapitre+'/exercice')
        //         reference_exercices.once("value", exercice_chapitre => {
        //             const exercices_user = exercice_chapitre.val();
        //             exercices_user ? setExercices(exercices_user) : setExercices([]);
                    
        //         })
        //     }
        // }

        if(userContext.user && userContext.user_informations){
            fetchChapterCourse()
        }
        
    }, [userContext.user , userContext.user_informations , fetchChapterCourse]);



    const [ openTab , setOpenTab ] = useState(true);

    return (
        <div className="exercices-container">
         
            <div className = 'exercises-title-container ' onClick = { () => setOpenTab(!openTab) } >
                <h2 className="exercises-title">Exercises</h2>

                <div className="exercises-infos">
                    <div className="exercises-number"> {exercices.length} </div>
                    <div className="show-hide-icon">
                        <span> <Icon name= {` ${ openTab ? 'minus square outline' : 'plus square outline' } `} link size='small' className = 'minus-icon' /> </span>
                    </div>
                </div>
            </div>

            <div className="exercises-content" style = { { transform: `${!openTab ? 'scaleY(0)' : 'scaleY(1)'}` , transformOrigin: '100% 0%' } } >
                {
                    chapterExercisesLoading &&   <div className={`loader-container`} style = {{ height: '30vh' , position: 'relative' }}>
                        <Dimmer active inverted>
                            <Loader inverted content='Chargement en cours  ...' />
                        </Dimmer>
                    </div>
                }

              
                {
                    !chapterExercisesLoading && allExercises.length > 0 &&
                    <div className="exercises-list">
                        {
                            allExercises.map( (ex , i) =>
                                <div className = 'exercise'>
                                    <h3> {convertText(ex?.title)} </h3>
                                    <p>{convertText(ex?.content)}</p>
                                </div>
                            )
                        }
                    </div>
                }

                {
                    chapterExercisesLoading &&
                    <div className="exercises-list">
                        <div className="exercises-loading">
                            <Icon name="spinner" size="large" />
                        </div>
                    </div>
                }

                {
                    !chapterExercisesLoading && !allExercises.length > 0 &&
                    <div className="exercises-list">
                        <div className="exercises-no-exercises">
                            <Icon name="exclamation circle" size="large" />
                            <span> No exercices found </span>
                        </div>
                    </div>
                }

            </div>
        </div>
    );
}
             
export default Exercises;
