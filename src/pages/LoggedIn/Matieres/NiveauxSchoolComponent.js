import React , { useContext } from 'react';
import {FirebaseContext} from '../../../firebase';
import UserContext from '../../../Context/UserContext/UserContext';
import './NiveauxSchoolComponent.css';
import { Icon } from 'semantic-ui-react';


const  NiveauxSchoolComponent = (props) => {

    const firebase = useContext(FirebaseContext)
    const userContext = useContext(UserContext)

    const handleChangeLevel = () => {
        const level = props.title;
        const database = firebase.getData();
        const usersRef =  database.ref('users/'+userContext.user.uid)

       
        usersRef.update({ "level": level})
                .then(() => { userContext.update_user_informations(level);})
                .catch(err => console.log(err));
    }

    return (
        <div className="niveaux_elements" onClick = {props.clicked}>
            <h5 className="title_niveaux" onClick={handleChangeLevel}>{props.title} </h5>
            <span className="arrow_niveaux"> <Icon name = 'angle right' /> </span> 
        </div> 
        
    )
}

export default NiveauxSchoolComponent;
