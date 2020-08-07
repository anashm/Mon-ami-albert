import React , { useReducer , useContext } from 'react';
import { GET_CONNECTED_USER,GET_USER_INFORMATIONS } from '../Types';

import UserReducer from './UserReducer';
import UserContext from './UserContext';
import {FirebaseContext} from '../../firebase'

const UserState = ({ children }) => {

    const initialState = {
        user: null,
        user_informations : null
    }

    const [ state , dispatch ] = useReducer(UserReducer , initialState);
    const firebase = useContext(FirebaseContext);
    const get_connected_user = user => {
        dispatch({ type: GET_CONNECTED_USER , payload : user });
    } 

    const get_user_informations = user_infos => dispatch({
        type :GET_USER_INFORMATIONS , payload : user_infos
    })


    return (
       <UserContext.Provider value={{ user : state.user , get_connected_user, get_user_informations , user_informations: state.user_informations }} >
           {children}
       </UserContext.Provider>
    )
}

export default UserState
