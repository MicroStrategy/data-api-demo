import {HTTP_ACTIONS} from '../../constants'


export const addNewHttpRequest = (data) => {
	return {
		type: HTTP_ACTIONS.ADD_NEW_HTTP_REQUEST,
		payload: data
	}
}

export const clearRequests = () => {
	return {
		type: HTTP_ACTIONS.CLEAR_REQUESTS
	}
}

export const selectRequest = (index) => {
	return {
		type: HTTP_ACTIONS.SELECT_REQUEST,
		payload: index
	}
}

export const selectDetailTab = (index) => {
	return {
		type: HTTP_ACTIONS.SELECT_DETAIL_TAB,
		payload: index
	}
}