import {ATTRIBUTES_ACTIONS} from '../../constants'

export const toggleAttributeSelection = (attributeId) => {
	return {
		type: ATTRIBUTES_ACTIONS.TOGGLE_ATTRIBUTE_SELECTION,
		payload: attributeId
	}
}

export const toggleAttributeAllSelection = (select, attributes) => {
	return {
		type: ATTRIBUTES_ACTIONS.TOGGLE_ALL_ATTRIBUTES,
		payload: {
			attributes,
			select
		}
	}
}