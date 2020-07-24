import * as actionTypes from "../actions/actionTypes";

const initialState = {
  contextMenu: {
    isOpen: false,
    sourceNode: {},
  },
  errorModal: {
    error: false,
    errorMessage: ''
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.OPEN_CONTEXT_MENU:
      return {
        ...state,
        contextMenu: {
          isOpen: true,
          sourceNode: action.sourceNode,
        },
        errorModal: {
          ...state.errorModal
        }
      };
    case actionTypes.CLOSE_CONTEXT_MENU:
      return {
        ...state,
        contextMenu: {
          isOpen: false,
          sourceNode: {},
        },
        errorModal: {
          ...state.errorModal
        }
      };
      case actionTypes.OPEN_ERROR_MODAL:
        return {
          ...state, 
          contextMenu: {
            isOpen: false,
            sourceNode: {}
          },
          errorModal: {
            error: true,
            errorMessage: action.errorMessage
          }
        }
        case actionTypes.CLOSE_ERROR_MODAL:
        return {
          ...state, 
          contextMenu: {
            ...state.contextMenu
          },
          errorModal: {
            error: false,
            errorMessage: ''
          }
        }
    default:
      return state;
  }
};

export default reducer;
