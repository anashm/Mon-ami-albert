import React,{ useReducer  } from 'react'
import ErrorReducer from './ErrorReducer';
import ErrorContext from './ErrorContext';
import {GET_ERROR_CONTEXT} from '../Types';

const  ErrorState = ({ children }) => {

    const initialState = {
        hasError : true
    }

    const [ state , dispatch ] = useReducer(ErrorReducer , initialState);


    const get_error = error => dispatch({ type: GET_ERROR_CONTEXT , payload : error });

    return (
        <ErrorContext.Provider value={{
                hasError : state.hasError,
                get_error
        }}> 
            {children}
        </ErrorContext.Provider> 
    )
};

export default ErrorState;
