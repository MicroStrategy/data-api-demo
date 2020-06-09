import {METRIC_ACTIONS} from '../../constants'

import initialState from '../../initialState'

const reducer = (state=initialState.metrics, action = {}) => {
    let unselect = {}
    switch(action.type){
    case METRIC_ACTIONS.TOGGLE_METRIC_SELECTION:
        unselect = {...state.ui.unselect}
        const metricId = action.payload
        if (metricId in unselect) {
            delete unselect[metricId]
        } else {
            unselect[metricId] = true
        }
        return {...state, ui: {unselect}}
    case METRIC_ACTIONS.TOGGLE_ALL_METRICS:
        unselect = {}    
        const {metrics, select} = action.payload        
        if (!select) {
            // Unselect all, use all ids
            for (const metric of metrics) {
                unselect[metric.id] = true
            }            
        }
        return {...state, ui: {unselect}}
    default:
        return state;
    }
}

export default reducer;