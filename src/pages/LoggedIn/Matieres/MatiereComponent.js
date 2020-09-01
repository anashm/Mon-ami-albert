import React , { useEffect , useState , useContext } from 'react';
import './MatiereComponent.css';

import UserContext from '../../../Context/UserContext/UserContext';

import {FirebaseContext} from '../../../firebase'


const MatiereComponent = (props) => {

    const firebase = useContext(FirebaseContext);

    const database = firebase.getData();




    const userContext = useContext(UserContext);

    const [ proress , setProgress ] = useState(0);

    

    useEffect(() => {

        if(userContext.user && userContext.user_informations){

            //console.log(`users/${userContext.user.uid}/Progression/${userContext.user_informations.level}/${props.course}`);

            const user_infos = Object.values(userContext.user_informations);

            const user_level = userContext.user_informations.level;

            const levels = user_infos[0];

            const refrence_matiere = database.ref(`schoolLevels/${userContext.user_informations.level}/subjects/${ props.course.includes('Math') ? 'Mathematique' :  props.course }`);

            

            refrence_matiere.once("value", chapter_infos => {

                if(chapter_infos.val()){
                    console.log();


                    if(levels[user_level][`${ props.course.includes('Math') ? 'Mathematique' :  props.course }`]){
                        let total_points = 0;
                        const progress_matiere = Object.values(levels[user_level][`${ props.course.includes('Math') ? 'Mathematique' :  props.course }`]);
                        const chapter_length = chapter_infos.val().all.length;

                        progress_matiere.forEach( progress => {
                            if(progress.progression){
                                total_points +=  progress.progression.points/60;
                            }
                        });

                        console.log(Math.floor(total_points*100)/chapter_length);

                        setProgress(Math.floor((total_points*100)/chapter_length));
                    }
                }
            })

            
     
                /* const refrence_matiere = database.ref(`users/${userContext.user.uid}/Progression/${userContext.user_informations.level}/${ props.course.includes('Math') ? 'Mathematique' :  props.course }`);
                refrence_matiere.once("value", user_informations => { 
                    console.log( 'anas ruben test' , user_informations.val()) ;
                   
                    if(user_informations.val()){
                        let total_points = 0;
                        const chapter_length = Object.keys(user_informations.val()).length - 1;
                        //console.log(chapter_length)
                        const progress_matiere = Object.values(user_informations.val());
    
                        progress_matiere.forEach( progress => {
                            if(progress.progression){
                                total_points +=  progress.progression.points;
                            }
                        });

                        setProgress(total_points/chapter_length);

                        


                        //console.log(total_points )

                    }

                }); */
            
        }

    } , [userContext.user_informations , userContext.user  ])

    
    return (
        <div className="matiere-container">
            <div className="image_container">
                <img src={props.logo} alt = ""   />
            </div>
           
            <div className="details-matieres">
                <p className="title-matiere">{props.title}</p>
                <div className="progression-bar">
                    <div className="in-progress">
                        <div className = 'progress' style = {{ width: `${proress}%` }} ></div>
                    </div>
                    <span className="pourcentage" > {proress}%</span>
                </div>
            </div>
        </div>
    )
}


export default MatiereComponent