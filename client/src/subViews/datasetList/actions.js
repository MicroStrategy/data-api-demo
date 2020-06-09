// import C from './constants'
// import axios from 'axios'
import {httpErrorHandling} from '../../utils/utils'
import {createInstanceAsync, getDatasetListAsync} from '../../utils/restUtils'
import {DATASET_LIST_ACTIONS, RESULT_ACTIONS, MAIN_UI_ACTIONS} from '../../constants'

export const getDatasetList = () => {
	return (dispatch, getState) => {
		getDatasetsAndCreateInstance(dispatch, getState).catch(
			httpErrorHandling(dispatch, MAIN_UI_ACTIONS.DISPLAY_ERROR_MSG))
  }
}

export const changeSelectDataset = (index) => {
	return (dispatch, getState) => {
		dispatch({
			type: DATASET_LIST_ACTIONS.CHANGE_SELECT_DATASET,
			payload: index
		})
		createInstanceAndRefreshTable(dispatch, getState, 0).catch(
			httpErrorHandling(dispatch, MAIN_UI_ACTIONS.DISPLAY_ERROR_MSG))
	}
}

const getDatasetsAndCreateInstance = async (dispatch, getState) => {
	const datasetsResult = await getDatasetListAsync(dispatch, getState)
	if (datasetsResult.length === 0) {
		dispatch({
			type: MAIN_UI_ACTIONS.DISPLAY_ERROR_MSG,
			payload: "Can't get a valid dataset. Please retry."
		})	
		return;
	}
	dispatch({
		type: DATASET_LIST_ACTIONS.SET_DATASET_LIST,
		payload: datasetsResult
	})
	return await createInstanceAndRefreshTable(dispatch, getState, 0)
}

export const createInstanceAndRefreshTable = async (dispatch, getState, pageIndex) => {
	const data = await createInstanceAsync(dispatch, getState, pageIndex)
	if (data.status === 2) {
		dispatch({
			type: MAIN_UI_ACTIONS.DISPLAY_ERROR_MSG,
			payload: "This report has unanswered prompts. It is currently not supported in this demo."
		})	
		return;
	}
	dispatch({
		type: RESULT_ACTIONS.REFRESH_RESULT_PANEL,
		payload: data
	})
	return data
}