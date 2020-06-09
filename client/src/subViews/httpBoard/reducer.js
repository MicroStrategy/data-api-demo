import initialState from '../../initialState'
import {HTTP_ACTIONS} from '../../constants'

const reducer = (state = initialState.http, action = {}) => {
    switch (action.type) {
        case HTTP_ACTIONS.ADD_NEW_HTTP_REQUEST:
            return {
                ...state, data: [
                    ...state.data, action.payload
                ]
            }
        case HTTP_ACTIONS.CLEAR_REQUESTS:
            return {
                data: [],
                ui: {}
            }
        case HTTP_ACTIONS.SELECT_REQUEST:
            return {
                ...state,
                ui: {
                    selectRequestIndex: action.payload,
                    selectDetailTab: 0
                }
            } 
        case HTTP_ACTIONS.SELECT_DETAIL_TAB:
        return {
            ...state,
                ui: {
                    ...state.ui,
                    selectDetailTab: action.payload
                }
            } 
        default:
            return state;
    }
}

export default reducer;