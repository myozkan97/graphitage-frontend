import * as actionTypes from './actionTypes';



export const clearNodes = (isActive) => {
    return {
        type: actionTypes.CLEAR_NODES,
        bool: isActive
    }
}