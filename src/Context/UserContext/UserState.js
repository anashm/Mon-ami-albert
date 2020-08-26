import React , { useReducer , useContext } from 'react';
import { 
    GET_CONNECTED_USER,
    GET_USER_INFORMATIONS,
    UPDATE_USER_LEVEL,
    UPDATE_USER_PROGRESS,
    UPDATE_USER_CURRENT_INDEX,
    UPDATE_USER_POINTS
} from '../Types';

import UserReducer from './UserReducer';
import UserContext from './UserContext';

const UserState = ({ children }) => {

    const initialState = {
        user: null,
        user_informations : null,
        user_progression: 0,
        user_current_question_index: 0,
        user_points : 50
    }

    const [ state , dispatch ] = useReducer(UserReducer , initialState);

    const get_connected_user = user => {
        dispatch({ type: GET_CONNECTED_USER , payload : user });
    } 

    const get_user_informations = user_infos => dispatch({
        type :GET_USER_INFORMATIONS , payload : user_infos
    });

    const update_user_informations = level => dispatch({
        type : UPDATE_USER_LEVEL , payload : level
    });

    const update_user_progression = progress => dispatch({ type: UPDATE_USER_PROGRESS , payload: progress });
    
    const update_user_current_question_index = index => dispatch({ type: UPDATE_USER_CURRENT_INDEX , payload: index });

    const update_user_points = points => dispatch({ type: UPDATE_USER_POINTS , payload: points });



    return (
       <UserContext.Provider value={{ 
            user : state.user ,
            user_informations: state.user_informations,
            user_progression: state.user_progression,
            user_current_question_index: state.user_current_question_index,
            user_points: state.user_points,
            get_connected_user, 
            get_user_informations ,
            update_user_informations,
            update_user_progression,
            update_user_current_question_index,
            update_user_points
            }} >
           {children}
       </UserContext.Provider>
    )
}

export default UserState
