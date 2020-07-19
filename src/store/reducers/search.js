import * as actionTypes from '../actions/actionTypes';


const initialState = {
}

const reducer = (state = initialState, action) => {
    switch ( action.type ) {
        case actionTypes.FETCH_SEARCH_RESULTS_AND:
            return {
                ...action.newNodes,
            }
        default :
            return state
        
    
    }
}


export default reducer;