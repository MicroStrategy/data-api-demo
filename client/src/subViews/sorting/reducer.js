import {SORT_ACTIONS} from '../../constants'
import initialState from '../../initialState'

function syncToOutput(state) {
    const selectedElement = state.ui.sorting.map(e => e.sortby).filter(e => e >= 0)
    return { ...state, output: selectedElement.map(e => state.data[e]) }
}

const reducer = (state = initialState.sorting, action = {}) => {
    switch (action.type) {
        case SORT_ACTIONS.CHANGE_SORTING_CHOICE:
            return {
                ...state, ui: {
                    ...state.ui, sorting: state.ui.sorting.map(
                        (data, i) => i === action.payload.dropDownIndex ? { ...data, order: action.payload.subIndex }
                            : data)
                }
            }
        case SORT_ACTIONS.CHANGE_SORTING_ELEMENT:
            return {
                ...state, ui: {
                    ...state.ui, sorting: state.ui.sorting.map(
                        (data, i) => i === action.payload.dropDownIndex ? { ...data, sortby: action.payload.subIndex }
                            : data)
                }
            }
        case SORT_ACTIONS.ADD_SORTING_DROPDOWN:
            return {
                ...state, ui: {
                    sortingDropdownNum: action.payload, sorting: [...state.ui.sorting, {
                        sortby: -1,
                        order: -1
                    }],
                }
            }
        case SORT_ACTIONS.CHANGE_SORTING_DATA:
            const changeDataState = {
                ...state, data: state.data.map((d, i) => 
                (i === state.ui.sorting[action.payload].sortby && d.type !== "attribute") 
                ? { ...d, order: state.ui.sorting[action.payload].order === 0 ? "ascending" : "descending" }
                : d)
            }
            return syncToOutput(changeDataState)
        case SORT_ACTIONS.DELETE_SORTING_DROPDOWN:
            const deleteDataState = {
                ...state, ui: {
                    ...state.ui, sorting: state.ui.sorting.filter((e, index) => index !== action.payload), sortingDropdownNum: state.ui.sortingDropdownNum - 1
                }
            }
            return syncToOutput(deleteDataState)
        case SORT_ACTIONS.CLEAR_SORTING_STATE:
            return {
                ...state, output: [],
                ui: {
                    sortingDropdownNum: 1,
                    sorting: [
                        {
                            sortby: -1,
                            order: -1
                        }
                    ]
                }
            }
        default:
            return state;
    }
}

export default reducer;