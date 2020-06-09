import { SORT_ACTIONS } from '../../constants'

export const changeSortingElement = (dropDownIndex, subIndex) => {
    return {
        type: SORT_ACTIONS.CHANGE_SORTING_ELEMENT,
        payload: { dropDownIndex: dropDownIndex, subIndex: subIndex }
    }
}

export const changeSortingChoice = (dropDownIndex, subIndex) => {
    return {
        type: SORT_ACTIONS.CHANGE_SORTING_CHOICE,
        payload: { dropDownIndex: dropDownIndex, subIndex: subIndex }
    }
}

export const addSortingDropdown = (dropDownNum) => {
    return {
        type: SORT_ACTIONS.ADD_SORTING_DROPDOWN,
        payload: dropDownNum
    }
}

export const changeSortingData = (output) => {
    return {
        type: SORT_ACTIONS.CHANGE_SORTING_DATA,
        payload: output
    }
}

export const deleteSortingDropdown = (index) => {
    return {
        type: SORT_ACTIONS.DELETE_SORTING_DROPDOWN,
        payload: index
    }
}

export const clearSortingState = () => {
    return {
        type: SORT_ACTIONS.CLEAR_SORTING_STATE,
        payload: ""
    }
}
