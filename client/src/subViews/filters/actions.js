import {createInstanceAsync, getAttributeElementsAsync} from '../../utils/restUtils'
import {httpErrorHandling} from '../../utils/utils'
import {contructNewExpressionFromRawdata} from '../../utils/filterUtils'

import {CONSTANTS, FILTER_ACTIONS, MAIN_UI_ACTIONS, RESULT_ACTIONS} from '../../constants'

// let rawExpessionData = {
// 	operator: this.state.operator,
// 	targetObject: availableObjects[this.state.selectedIndex],
// 	selectAttributeForm: availableObjects[this.state.selectedIndex].forms[this.state.selectFormIndex],
// 	constant: this.state.constant
// }
export const getAttributeElement = (attributeId) => {
	return (dispatch, getState) => {
		getAttributeElementWithRetry(dispatch, getState, attributeId).catch(
			httpErrorHandling(dispatch, MAIN_UI_ACTIONS.DISPLAY_ERROR_MSG))
	}
}


const getAttributeElementWithRetry = async (dispatch, getState, attributeId) => {
	for (let i = 0; i < CONSTANTS.MAX_TRY_COUNT; i++) {
		try {
			const elements = await getAttributeElementsAsync(dispatch, getState, attributeId)
			dispatch({
				type: FILTER_ACTIONS.MODIFY_ATTRIBUTE_ELEMENTS,
				payload: {
					attributeId,
					data: elements
				}
			})
			return elements
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

export const deleteAnExpression = (index,isViewFilter,targetObjectId) => {
	return {
		type: FILTER_ACTIONS.DELETE_AN_EXPRESSION,
		payload: {
			index,
			isViewFilter,
			targetObjectId
		}
	}
}

/*
	let rawExpessionData = {
	operator: this.state.operator,
	targetObject: availableObjects[this.state.selectedIndex],
	selectAttributeForm: isAttributeSelected ? availableObjects[this.state.selectedIndex].forms[this.state.selectFormIndex] : 0,
	constant: this.state.constant,
	isQualification: this.state.isQualification,
	selectedElements: selectedElements,
	selectedListOperator: listOptions[selectedListOptionIndex].value
}
*/
export const addNewExpression = (rawExpressionData) => {
	return {
		type: FILTER_ACTIONS.ADD_NEW_EXPRESSION,
		payload: contructNewExpressionFromRawdata(rawExpressionData)
	}
}

export const modifyExpression = (rawExpressionData) => {
	return {
		type: FILTER_ACTIONS.MODIFY_EXPRESSION,
		payload: contructNewExpressionFromRawdata(rawExpressionData)
	}
}

export const clearAllFilterExpressions = (isViewFilter) =>{
	return {
		type: FILTER_ACTIONS.CLEAR_ALL_FILTER_EXPRESSIONS,
		payload:isViewFilter
	}
}
