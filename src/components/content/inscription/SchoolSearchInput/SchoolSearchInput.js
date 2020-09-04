import React , { useCallback , useReducer , useEffect } from 'react';
import _ from 'lodash'
import { Search } from 'semantic-ui-react';
import json from './new-etablissements.json';


const source = json;

const initialState = {
    loading: false,
    results: [],
    value: '',
}

function schoolReducer(state, action) {
    switch (action.type) {
        case 'CLEAN_QUERY':
            return initialState
        case 'START_SEARCH':
            return { ...state, loading: true, value: action.query }
        case 'FINISH_SEARCH':
            return { ...state, loading: false, results: action.results }
        case 'UPDATE_SELECTION':
            return { ...state, value: action.selection }
        default:
        throw new Error()
    }
}

const SchoolSearchInput = ({ changed }) => {


    const [state, dispatch] = useReducer(schoolReducer, initialState)
    const { loading, results, value } = state

    //send value to parent
    changed(value)


    const timeoutRef = React.useRef()
    const handleSearchChange = useCallback((e, data) => {
        clearTimeout(timeoutRef.current)
        dispatch({ type: 'START_SEARCH', query: data.value })

        timeoutRef.current = setTimeout(() => {
            if (data.value.length === 0) {
                dispatch({ type: 'CLEAN_QUERY' })
                return
            }

            const re = new RegExp(_.escapeRegExp(data.value), 'i')
            const isMatch = (result) => re.test(result.value)


            dispatch({
                type: 'FINISH_SEARCH',
                results: _.filter(source, isMatch),
            })
        }, 300);

    }, [])

        useEffect(() => {
            return () => {
                clearTimeout(timeoutRef.current)
            }
        }, []);

    return (
        <div>
            <Search
                className = 'w-100'
                placeholder = "Nom de l'école ..."
                noResultsMessage = 'Aucune école trouvée :('
                loading={loading}
                onResultSelect={(e, data) =>
                    dispatch({ type: 'UPDATE_SELECTION', selection: data.result.title })
                }
                onSearchChange={handleSearchChange}
                results={results.filter((data , index) => index < 6)}
                value={value}
            />
        </div>
        
    )
}

export default SchoolSearchInput;
