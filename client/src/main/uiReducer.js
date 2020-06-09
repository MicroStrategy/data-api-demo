import initialState from '../initialState'

import {MAIN_UI_ACTIONS} from '../constants'

const uiReducer = (state=initialState.ui, action) => {
  switch(action.type){
    case MAIN_UI_ACTIONS.DISPLAY_ERROR_MSG:
      return {
        ...state,
        latestError: action.payload,
        showError: true
      }
    case MAIN_UI_ACTIONS.HIDE_ERROR_MSG:
      return {
        ...state,
        showError: false
      }
    default:
      return state
  }
}

export default uiReducer