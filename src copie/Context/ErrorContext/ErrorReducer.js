import {GET_ERROR_CONTEXT} from '../Types';


export default ( state , action) => {

    switch (action.type) {
        case (GET_ERROR_CONTEXT):
            return ({
                ...state,
                hasError: action.payload
            }); 

        default:
            return state;
    }
}