import  {
    GET_CONNECTED_USER,
    GET_USER_INFORMATIONS,
    UPDATE_USER_LEVEL , 
    UPDATE_USER_PROGRESS,
    UPDATE_USER_CURRENT_INDEX,
    UPDATE_USER_POINTS
} from "../Types"

export default ( state , action) => {

    switch (action.type) {
        case (GET_CONNECTED_USER):
            return ({
                ...state,
                user: action.payload
            });
        
        case(GET_USER_INFORMATIONS):
            return ({
                ...state,
                user_informations : action.payload
            });

        case(UPDATE_USER_LEVEL):
        return ({
            ...state,
            user_informations : {
                ...state.user_informations,
                level : action.payload
                
            }
        });
        case(UPDATE_USER_PROGRESS):
        return({
            ...state,
            user_progression: action.payload
        });

        case(UPDATE_USER_CURRENT_INDEX):
        return({
            ...state,
            user_current_question_index: action.payload
        })

        case(UPDATE_USER_POINTS):
        return({
            ...state,
            user_points: action.payload
        })
    
        default:
            return state;
    }
}