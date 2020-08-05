import  {GET_CONNECTED_USER} from "../Types"

export default ( state , action) => {

    switch (action.type) {
        case (GET_CONNECTED_USER):
            return ({
                ...state,
                user: action.payload
            })
    
        default:
            return state;
    }
}