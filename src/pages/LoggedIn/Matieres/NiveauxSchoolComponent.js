import React , { useContext } from 'react';
import {FirebaseContext} from '../../../firebase';
import UserContext from '../../../Context/UserContext/UserContext';
import './NiveauxSchoolComponent.css';


const  NiveauxSchoolComponent = (props) => {

    const firebase = useContext(FirebaseContext)
    
    
    const userContext = useContext(UserContext)
    


    const handleChangeLevel = () => {
        const level = props.title;
        const userId=props.userConnected;
        const database = firebase.getData();
        const usersRef =  database.ref('users/'+userId)

        usersRef.update({
            "level": level
        });
       
        userContext.update_user_informations(level);

    }

    return (
        <div className="niveaux_elements" onClick = {props.clicked}>
            <span className="title_niveaux" onClick={handleChangeLevel}>{props.title} </span>
            <span className="arrow_niveaux">&gt;</span> 
        </div> 
        
    )
}

export default NiveauxSchoolComponent
