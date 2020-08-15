import  {GET_CONNECTED_USER,GET_USER_INFORMATIONS,UPDATE_USER_LEVEL} from "../Types"

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
        })
    
        default:
            return state;
    }
}