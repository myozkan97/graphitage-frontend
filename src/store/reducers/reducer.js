import * as actionTypes from '../actions/actions'

const initialState = {
    clearNodes: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CLEAR_NODES:
            return {
                ...state,
                clearNodes: action.bool
            };
            
        default:
            return state;
    }
};

export default reducer;