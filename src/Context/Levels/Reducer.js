import {
    FETCH_LEVELS_ERROR,
    FETCH_LEVELS_LOADING,
    FETCH_LEVELS_SUCCESS,
    SET_LEVELS
} from './constants';

const INITIAL_STATE = {
    loading : false,
    items : [],
    error : ''
}

const levelsReducers = ( state = INITIAL_STATE , action ) => {

    switch (action.type) {
        case SET_LEVELS : 
            return {
                ...state,
                items : action?.payload
            }
        case FETCH_LEVELS_LOADING:
            return {
                ...state,
                loading : true
            }
        case FETCH_LEVELS_SUCCESS:
            return {
                ...state,
                loading : false,
                error : '',
                items : action?.payload
            }
        case FETCH_LEVELS_ERROR:
            return {
                ...state,
                loading : false,
                error : action?.payload
            }
    
        default:
            return state;
    }
}

export default levelsReducers;