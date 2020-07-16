import * as actionTypes from '../actions/actionTypes';


const initialState = {
    // id: '',
    // title : '',
    // reader: '',
    // paperIdType: '',
    // year: '',
    // keywords: [],
    // abstractOfPaper: '',
    // targets: [],
    // problems:  [],
    // summaries: [],
    // components:  [],
    // applicationDomains: [],
    // data: [],
    // highlights: [],
    // contributions: [],
    // pros: [],
    // cons: [],
}



const reducer = (state = initialState, action) => {
    switch ( action.type ) {
        case actionTypes.FETCH_DETAILS:
            return {
                ...action.details,
            }
        default :
            return state
        
    
    }
}


export default reducer;