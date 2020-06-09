import {FILTER_ACTIONS} from '../../constants'
import initialState from '../../initialState'
import produce from "immer"

const reducer = (state = initialState.filters, action = {}) => {

    // let newState = {};
    // let newItem = null;
    // let newNotes = [];
    // let selectIdx = -1;
    const nextState = produce(state, newState => {
        switch (action.type) {
            case FILTER_ACTIONS.ADD_NEW_EXPRESSION:
                let isViewFilter = action.payload.isViewFilter
                let targetObjectId = action.payload.targetObjectId
                let expression = action.payload.expression
                let contentDisplay = action.payload.contentDisplay

                if (isViewFilter) {
                    newState.viewFilter.expressions.operands = [...state.viewFilter.expressions.operands, expression]
                    newState.viewFilter.summary = [...state.viewFilter.summary, contentDisplay]
                } else {
                    let newMetricLimitsExpressions = Object.assign({}, state.metricLimits.expressions)
                    let newMetricLimitsSummary = Object.assign({}, state.metricLimits.summary)

                    if (newMetricLimitsExpressions[targetObjectId]) {
                        newMetricLimitsExpressions[targetObjectId].operands.push(expression)
                        newMetricLimitsSummary[targetObjectId].push(contentDisplay)
                    } else {
                        let newMetricLimitExpression = {
                            operator: 'And',
                            operands: [expression]
                        }
                        newMetricLimitsExpressions[targetObjectId] = newMetricLimitExpression
                        newMetricLimitsSummary[targetObjectId] = [contentDisplay]
                    }

                    newState.metricLimits.expressions = newMetricLimitsExpressions
                    newState.metricLimits.summary = newMetricLimitsSummary

                }

                return

            case FILTER_ACTIONS.MODIFY_EXPRESSION:
                let modifyExpressionIndex = action.payload.expressionIndex
                let modifyExpression = action.payload.expression
                let modifyContentDisplay = action.payload.contentDisplay

                targetObjectId = action.payload.targetObjectId
                isViewFilter = action.payload.isViewFilter

                if (isViewFilter) {
                    newState.viewFilter.expressions.operands = [...state.viewFilter.expressions.operands.slice(0, modifyExpressionIndex), modifyExpression, ...state.viewFilter.expressions.operands.slice(modifyExpressionIndex + 1)]
                    newState.viewFilter.summary = [...state.viewFilter.summary.slice(0, modifyExpressionIndex), modifyContentDisplay, ...state.viewFilter.summary.slice(modifyExpressionIndex + 1)]
                } else {
                    let newMetricLimitsExpressions = Object.assign({}, state.metricLimits.expressions)
                    let newMetricLimitsSummary = Object.assign({}, state.metricLimits.summary)

                    newMetricLimitsExpressions[targetObjectId].operands = [...state.metricLimits.expressions[targetObjectId].operands.slice(0, modifyExpressionIndex), modifyExpression, ...state.metricLimits.expressions[targetObjectId].operands.slice(modifyExpressionIndex + 1)]
                    newMetricLimitsSummary[targetObjectId] = [...newMetricLimitsSummary[targetObjectId].slice(0, modifyExpressionIndex), modifyContentDisplay, ...newMetricLimitsSummary[targetObjectId].slice(modifyExpressionIndex + 1)]

                    newState.metricLimits.expressions = newMetricLimitsExpressions
                    newState.metricLimits.summary = newMetricLimitsSummary
                }
                return

            case FILTER_ACTIONS.DELETE_AN_EXPRESSION:
                let deleteIndex = action.payload.index
                isViewFilter = action.payload.isViewFilter
                targetObjectId = action.payload.targetObjectId

                if (isViewFilter) {
                    newState.viewFilter.expressions.operands = [...state.viewFilter.expressions.operands.slice(0, deleteIndex), ...state.viewFilter.expressions.operands.slice(deleteIndex + 1)]
                    newState.viewFilter.summary = [...state.viewFilter.summary.slice(0, deleteIndex), ...state.viewFilter.summary.slice(deleteIndex + 1)]
                } else {
                    let newMetricLimitsExpressions = Object.assign({}, state.metricLimits.expressions)
                    let newMetricLimitsSummary = Object.assign({}, state.metricLimits.summary)

                    if(state.metricLimits.expressions[targetObjectId].operands.length > 1){
                        newMetricLimitsExpressions[targetObjectId].operands = [...state.metricLimits.expressions[targetObjectId].operands.slice(0, deleteIndex), ...state.metricLimits.expressions[targetObjectId].operands.slice(deleteIndex + 1)]
                        newMetricLimitsSummary[targetObjectId] = [...newMetricLimitsSummary[targetObjectId].slice(0, deleteIndex), ...newMetricLimitsSummary[targetObjectId].slice(deleteIndex + 1)]    
                    }else{
                        //only have one expression for specify metric, then remove key-value("metricId":{expression})
                        delete newMetricLimitsExpressions[targetObjectId]
                        delete newMetricLimitsSummary[targetObjectId]
                    }

                    newState.metricLimits.expressions = newMetricLimitsExpressions
                    newState.metricLimits.summary = newMetricLimitsSummary
                }
                return
            case FILTER_ACTIONS.CLEAR_ALL_FILTER_EXPRESSIONS:
                isViewFilter = action.payload
                if (isViewFilter) {
                    if (state.viewFilter){
                        newState.viewFilter.expressions.operands = []
                        newState.viewFilter.summary = []
                    }
                } else {
                    if(state.metricLimits){
                        newState.metricLimits.expressions = {}
                        newState.metricLimits.summary = {}
                    }
                }
                return
            default:
                return
        }
    })
    return nextState
}

export default reducer;