import {createInstanceAsync} from '../utils/restUtils'
import {httpErrorHandling} from '../utils/utils'
import {MAIN_UI_ACTIONS, RESULT_ACTIONS} from '../constants'

export const hideErrorMessage = () => {
  return {
    type: MAIN_UI_ACTIONS.HIDE_ERROR_MSG
  }
}

export const applyCondition = () => {
  // Re-apply condition, must be start with 0
  return (dispatch, getState) => {
    createInstanceAsync(dispatch, getState, 0).then((data) => {
      dispatch({
				type: RESULT_ACTIONS.REFRESH_RESULT_PANEL,
				payload: data
			})
    }).catch(httpErrorHandling(dispatch, MAIN_UI_ACTIONS.DISPLAY_ERROR_MSG))
  };
}