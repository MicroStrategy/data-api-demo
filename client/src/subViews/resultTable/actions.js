import {createInstanceAsync, getObjectDataAsync} from '../../utils/restUtils'
import {httpErrorHandling} from '../../utils/utils'
import {CONSTANTS, RESULT_ACTIONS, MAIN_UI_ACTIONS} from '../../constants'


export const goToPage = (pageIndex) => {
	return (dispatch, getState) => {
		const state = getState()
		const data = state.resultTable.data
		if(data[pageIndex] !== undefined) {
			dispatch({
				type: RESULT_ACTIONS.GO_TO_PAGE,
				payload: pageIndex
			})
		}
		else {
			dispatch({
				type: RESULT_ACTIONS.BEGIN_LOADING_PAGE,
			})
			// Here we never need to get page 0 as it's already got at start,
			// so getObjectDataWithRetry can satisfy us
			getObjectDataWithRetry(dispatch, getState, pageIndex)
		 	 .catch(httpErrorHandling(dispatch, MAIN_UI_ACTIONS.DISPLAY_ERROR_MSG))
		}
	}
}

const getObjectDataWithRetry = async (dispatch, getState, pageIndex) => {
	for (let i = 0; i < CONSTANTS.MAX_TRY_COUNT; i++) {
		try {
			const data = await getObjectDataAsync(dispatch, getState, pageIndex)
			dispatch({
				type: RESULT_ACTIONS.REFRESH_RESULT_PANEL,
				payload: data
			})
			return data
		} catch (err) {
			// Only retry once
			const isLastAttempt = i > 0
			if (!isLastAttempt && err.response.status === 404) {
				// Re-create a instance here
				const data = await createInstanceAsync(dispatch, getState, 0)
				dispatch({
					type: RESULT_ACTIONS.REFRESH_INSTANCE_ID,
					payload: data
				})	
			}
			else {
				throw err
			}
		}
	}
}

