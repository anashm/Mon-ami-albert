import  {GET_CONNECTED_USER,GET_USER_INFORMATIONS} from "../Types"

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
            })
    
        default:
            return state;
    }
}