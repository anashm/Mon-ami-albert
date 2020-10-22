import React , { useState,useEffect,useContext } from 'react';
import { Icon } from 'semantic-ui-react';
import Exercise from './Exercise/Exercise';
import exercises from './ex';
import './Exercises.scss';
import { useHistory } from "react-router-dom";
import {FirebaseContext} from '../../../firebase';
import UserContext from '../../../Context/UserContext/UserContext';
import Pdf from "react-to-pdf";
import PDF from './Exercise/TestPDF';


const Exercises = ({urlParams}) => {

    const refs = React.createRef();
    
    
    var matiere =  urlParams.matieres;
    var chapitre = urlParams.chapitre;

    const firebase = useContext(FirebaseContext)
    const userContext = useContext(UserContext)
   // const [infosLevel , setinfosLevel ] = useState(null)
    //const [ chapitresTitle , setChapitresTitle ] = useState([])

    const [ exercices , setExercices ] = useState([])

    const history = useHistory();


    useEffect(() => {

        if(userContext.user && userContext.user_informations){
            const database = firebase.getData();
            if(exercices.length < 1){
                const reference_exercices = database.ref('schoolLevels/'+userContext.user_informations.level+'/subjects/'+matiere+'/'+chapitre+'/exercice')
                reference_exercices.once("value", exercice_chapitre => {
                    const exercices_user = exercice_chapitre.val();
                    exercices_user ? setExercices(exercices_user) : setExercices([]);
                    
                })
            }
        }
        
    }, [userContext.user , userContext.user_informations]);



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
              
                 { (exercices.length > 0) ? exercices.map( (exercice , index) => {
                    return (
                        <Exercise 
                            key = { index }
                            index = {index+1} 
                            title = {exercice.contenu.enonce.titre_exercice} 
                            enonce_intitule = {exercice.contenu.enonce.intitule}
                            enonce_choices = {exercice.contenu.enonce.choices}
                            corrige_intitule = {exercice.contenu.corrige.intitule}
                            corrige_choices = {exercice.contenu.corrige.choices}
                           /*  content = {exercice.contenu.enonce.intitule}  */
                            /* downloadLink = { exercise.downloadLink } */
                        />

                     )
                    
                })  :  <p>Listes des exercices en cours de préparation ...</p>} 
              
            
      
            </div>

           
            
        </div>

    );
}

export default Exercises;