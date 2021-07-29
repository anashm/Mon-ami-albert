import React , { useReducer , useContext } from 'react';

import {
    SET_LEVELS,
    FETCH_LEVELS_LOADING,
    FETCH_LEVELS_ERROR,
    FETCH_LEVELS_SUCCESS,
    SET_LEVELS_ERROR,
    SET_LEVELS_ITEMS
} from './constants';

import LevelsReducer from './Reducer';
import LevelsContext from './Context';
import { FirebaseContext } from '../../firebase';
import firebase_db from "firebase/app";



const LevelsState = ({ children }) => {

    const firebaseApp = useContext(FirebaseContext);


    const initialState = {
        loading : false,
        items : [],
        error : ''
    }

    const [ state , dispatch ] = useReducer(LevelsReducer , initialState);


    const fetchAllLevels = async () => {
        const database = firebaseApp.getData();

        dispatch({ type : FETCH_LEVELS_LOADING });
        const userCredential = firebase_db.auth().currentUser;
        // await AsyncStorage.removeItem('levels');
        // const cachedLevels = await AsyncStorage.getItem( 'levels');
    
        // if(!refreshCash && cachedLevels){
        //     const levels = JSON.parse( cachedLevels )
        //     return dispatch({ type : SET_LEVELS , payload : levels });
        // }
    
        try{
            if(userCredential){
                const levelsRef = database.ref(`schoolLevels`);
                const levelsSnapshot = await levelsRef.once('value');
                const levels = levelsSnapshot.val();
                if(levels){
                   
                    const filteredLevels = Object.keys(levels)
                    .filter( (key) => key?.toLocaleLowerCase()?.trim() !== 'all')
                    .map( (level , index) => ({
                        id : index,
                        name : level
                    }) )
                    
                    // console.log(filteredLevels)
                    dispatch({ type : SET_LEVELS , payload : filteredLevels });
                    // await AsyncStorage.setItem( 'levels' , JSON.stringify(filteredLevels) )
                }
    
                if(!levels){
                    dispatch({ type : FETCH_LEVELS_ERROR , payload : 'no levels'});
                }   
    
            }else{
                dispatch({ type : FETCH_LEVELS_ERROR , payload : 'Error'  })
            }
    
        }catch(error){
            console.log(error);
            dispatch({ type : FETCH_LEVELS_ERROR , payload : error?.message || 'Error'  })
        }
    }


    return (
        <LevelsContext.Provider value={{ 
            items : state.items,
            loading : state.loading,
            error : state.error,
            fetchAllLevels
        }} >
            {children}
        </LevelsContext.Provider>
    )
}

export default LevelsState;
