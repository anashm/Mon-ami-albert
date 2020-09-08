import React,{ useReducer  } from 'react'
import ErrorReducer from './ErrorReducer';
import ErrorContext from './ErrorContext';
import {GET_ERROR_CONTEXT} from '../Types';

const  ErrorState = ({ children }) => {

    const initialState = {
        error : false
    }

    const [ state , dispatch ] = useReducer(ErrorReducer , initialState);


    const get_error_context = error => dispatch({ type: GET_ERROR_CONTEXT , payload : error });

    return (
       <ErrorContext value={{
           error : state.error
       }}> 
            {children}
       </ErrorContext> 
    )
};

export default ErrorState;
