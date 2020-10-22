import React , { useReducer  } from 'react';
import { 
    GET_CONNECTED_USER,
    GET_USER_INFORMATIONS,
    UPDATE_USER_LEVEL,
    UPDATE_USER_PROGRESS,
    UPDATE_USER_CURRENT_INDEX,
    UPDATE_USER_POINTS,
    UPDATE_USER_POINTS_ANAS,
    UPDATE_QIZZ_QUESTIONS,
    UPDATE_USER_CHECKED_FALSE_ANSWER,
    UPDATE_USER_CHECKED_TRUE_ANSWER,
    UPDATE_USER_CHECK_TRUE_ANSWER,
    UPDATE_USER_PLAYING_QUIZZ,
    UPDATE_USER_FOUND_ANSWER,
    UPDATE_USER_ON_QUIZZ_SUMMARY_PAGE,
    UPDATE_QUIZZ_NEXT_INDEX,
    UPDATE_USER_NOT_FOUND_ANSWER,
    UPDATE_USER_COURSES,
    UPDATE_CURRENT_LOCATION
} from '../Types';

import UserReducer from './UserReducer';
import UserContext from './UserContext';

const UserState = ({ children }) => {

    const initialState = {
        user: null,
        user_informations : null,
        user_progression: 0,
        user_current_question_index: 0,
        user_points : 0,
        quizz_questions: 0,
        quizz_next_index: 0,
        user_found_answer: 0,
        user_not_found_answer: 0,
        user_checked_true_answer: false,
        user_checked_false_answer: false,
        user_check_true_answer: false,
        user_playing_quizz: false,
        user_on_quizz_summary_page: false,
        user_points_anas : 0,
        user_courses: null,
        current_location: ''
    }

    const [ state , dispatch ] = useReducer(UserReducer , initialState);

    const get_connected_user = user => dispatch({ type: GET_CONNECTED_USER , payload : user });

    const get_user_informations = user_infos => dispatch({ type :GET_USER_INFORMATIONS , payload : user_infos });

    const update_user_informations = level => dispatch({ type : UPDATE_USER_LEVEL , payload : level });

    const update_user_progression = progress => dispatch({ type: UPDATE_USER_PROGRESS , payload: progress });
    
    const update_user_current_question_index = index => dispatch({ type: UPDATE_USER_CURRENT_INDEX , payload: index });

    const update_user_points = points => dispatch({ type: UPDATE_USER_POINTS , payload: points });

    const update_user_points_anas = points => dispatch({ type: UPDATE_USER_POINTS_ANAS , payload: points });

    const update_quizz_questions = number => dispatch({ type: UPDATE_QIZZ_QUESTIONS , payload: number });

    const update_user_checked_true_answer = check => dispatch({ type: UPDATE_USER_CHECKED_TRUE_ANSWER , payload: check  });

    const update_user_checked_false_answer = check => dispatch({ type: UPDATE_USER_CHECKED_FALSE_ANSWER , payload: check });

    const update_user_check_true_answer = check => dispatch({ type: UPDATE_USER_CHECK_TRUE_ANSWER , payload: check  });

    const update_user_playing_quizz = check => dispatch({ type: UPDATE_USER_PLAYING_QUIZZ , payload: check  });

    const update_user_found_answer = number => dispatch({ type: UPDATE_USER_FOUND_ANSWER , payload: number });

    const update_user_not_found_answer = number => dispatch({ type: UPDATE_USER_NOT_FOUND_ANSWER , payload: number });

    const update_user_on_quizz_summary_page = check => dispatch({ type: UPDATE_USER_ON_QUIZZ_SUMMARY_PAGE , payload: check });

    const update_quizz_next_index = number => dispatch({ type: UPDATE_QUIZZ_NEXT_INDEX , payload: number });

    const update_user_courses = course => dispatch({ type: UPDATE_USER_COURSES , payload: course });

    const update_current_location = location => dispatch({ type: UPDATE_CURRENT_LOCATION , payload:  location });









    return (
        <UserContext.Provider value={{ 
            user : state.user ,
            user_informations: state.user_informations,
            user_progression: state.user_progression,
            user_current_question_index: state.user_current_question_index,
            user_points: state.user_points,
            quizz_questions: state.quizz_questions,
            quizz_next_index: state.quizz_next_index,
            user_checked_true_answer: state.user_checked_true_answer,
            user_checked_false_answer: state.user_checked_false_answer,
            user_check_true_answer : state.user_check_true_answer,
            user_playing_quizz: state.user_playing_quizz,
            user_found_answer: state.user_found_answer,
            user_not_found_answer: state.user_not_found_answer,
            user_on_quizz_summary_page: state.user_on_quizz_summary_page,
            user_courses: state.user_courses,
            current_location: state.current_location,
            update_quizz_questions,
            get_connected_user, 
            get_user_informations ,
            update_user_informations,
            update_user_progression,
            update_user_current_question_index,
            update_user_points,
            update_user_points_anas,
            update_user_checked_true_answer,
            update_user_checked_false_answer,
            update_user_check_true_answer,
            update_user_playing_quizz,
            update_user_found_answer,
            update_user_not_found_answer,
            update_user_on_quizz_summary_page,
            update_quizz_next_index,
            update_user_courses,
            update_current_location
        }} >
            {children}
        </UserContext.Provider>
    )
}

export default UserState
