import * as actionTypes from '../actions/actionTypes';


const initialState = {
    contextMenu: {
        isOpen: false,
        nodeId: ''
    }
}

const reducer = (state = initialState, action) => {
    switch ( action.type ) {
        case actionTypes.OPEN_CONTEXT_MENU:
            return {
                ...state,
                contextMenu: {
                    isOpen: true,
                    nodeId: action.nodeId
                }
            }
        case actionTypes.CLOSE_CONTEXT_MENU:
            return {
                ...state,
                contextMenu: {
                    isOpen: false,
                    nodeId: ''
                }
            }
        default :
            return state
        
    
    }
}


export default reducer;