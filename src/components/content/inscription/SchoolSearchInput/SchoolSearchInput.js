import React , { useCallback , useReducer , useEffect , memo } from 'react';
import _, { result } from 'lodash'
import { Search } from 'semantic-ui-react';
//import json from './new-etablissements.json';
import json from './etablissement_france_maroc.json';
import fuzz from 'fuzzball';

const source = json;

const initialState = {
    loading: false,
    results: [],
    value: '',
   pays : ''
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
            return { ...state, value: action.selection,pays:action.pays }
        default:
        throw new Error()
    }
}


const filterString = (source , resultat) => {

  
   return source.filter(school =>{
        
        return school.value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().includes(resultat.toLowerCase())
    
    })
   
} 

const SchoolSearchInput = ({ changed }) => {

    const [state, dispatch] = useReducer(schoolReducer, initialState);
    const { loading, results, value,pays } = state;
    //console.log(state)
    changed(value,pays);
  
    //send value to parent
    

    const timeoutRef = React.useRef();

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
                //results: _.filter(source, isMatch),
                results : filterString(source,data.value)
            })
        }, 300);

    }, [value]);

    useEffect(() => {
        //console.log('hello from 1 ');
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
                    dispatch({ type: 'UPDATE_SELECTION', selection: data.result.title,pays:data.result.pays })
                }
                onSearchChange={handleSearchChange}
                results={results.filter((data , index) => index < 6)}
                value={value}
                
            />
        </div>
        
    )
}

export default SchoolSearchInput ;
