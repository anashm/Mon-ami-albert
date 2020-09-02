import  {
    GET_CONNECTED_USER,
    GET_USER_INFORMATIONS,
    UPDATE_USER_LEVEL , 
    UPDATE_USER_PROGRESS,
    UPDATE_USER_CURRENT_INDEX,
    UPDATE_USER_POINTS,
    UPDATE_QIZZ_QUESTIONS,
    UPDATE_USER_CHECKED_FALSE_ANSWER,
    UPDATE_USER_CHECKED_TRUE_ANSWER,    
    UPDATE_USER_CHECK_TRUE_ANSWER,
    UPDATE_USER_PLAYING_QUIZZ,
    UPDATE_USER_FOUND_ANSWER,
    UPDATE_USER_ON_QUIZZ_SUMMARY_PAGE,
    UPDATE_QUIZZ_NEXT_INDEX
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
        });

        case(UPDATE_QIZZ_QUESTIONS):
        return({
            ...state,
            quizz_questions: action.payload
        });

        case(UPDATE_USER_CHECKED_FALSE_ANSWER):
        return({
            ...state,
            user_checked_false_answer: action.payload
        });

        case(UPDATE_USER_CHECKED_TRUE_ANSWER):
        return({
            ...state,
            user_checked_true_answer: action.payload
        });

        case(UPDATE_USER_CHECK_TRUE_ANSWER):
        return({
            ...state,
            user_check_true_answer: action.payload
        });
        case(UPDATE_USER_PLAYING_QUIZZ):
        return({
            ...state,
            user_playing_quizz: action.payload
        });

        case(UPDATE_USER_FOUND_ANSWER):
        return({
            ...state,
            user_found_answer: action.payload
        });

        case(UPDATE_USER_ON_QUIZZ_SUMMARY_PAGE):
        return({
            ...state,
            user_on_quizz_summary_page: action.payload
        });

        case(UPDATE_QUIZZ_NEXT_INDEX):
        return({
            ...state,
            quizz_next_index: action.payload
        });

    
        default:
            return state;
    }
}