import React , { useReducer , useContext } from 'react';
import { GET_CONNECTED_USER } from '../Types';
import UserReducer from './UserReducer';
import UserContext from './UserContext';
import {FirebaseContext} from '../../firebase'

const UserState = ({ children }) => {

    const initialState = {
        user: null
    }

    const [ state , dispatch ] = useReducer(UserReducer , initialState);
    const firebase = useContext(FirebaseContext);
    const get_connected_user = user => {
        dispatch({ type: GET_CONNECTED_USER , payload : user });
    } 


    return (
       <UserContext.Provider value={{ user : state.user , get_connected_user }} >
           {children}
       </UserContext.Provider>
    )
}

export default UserState
