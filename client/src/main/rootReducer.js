// import C from '../constants'
// import initialState from './initialState'

import { combineReducers } from 'redux'

import filtersReducer from "../subViews/filters/reducer"

import initialState from '../initialState'
import uiReducer from './uiReducer'

import {DATASET_LIST_ACTIONS} from '../constants'
import { sortingDataTransform } from "../utils/utils"


import attributesReducer from "../subViews/attributes/reducer"
import metricsReducer from "../subViews/metrics/reducer"
import datasetsReducer from '../subViews/datasetList/reducer'
import resultTableReducer from '../subViews/resultTable/reducer'
import httpReducer from '../subViews/httpBoard/reducer'
import sortingReduce from "../subViews/sorting/reducer"



const allSubReducers = combineReducers({
    ui: uiReducer,
    datasetList: datasetsReducer, 
    filters: filtersReducer,
    sorting: sortingReduce,
    http: httpReducer,
    attributes: attributesReducer,
    metrics: metricsReducer,
    resultTable: resultTableReducer,
})

const rootReducer = (state, action) => {
    // console.log('root state:', state)
    let datasetList = {}
    let sortingData = []
    switch(action.type){
    case DATASET_LIST_ACTIONS.CHANGE_SELECT_DATASET:
        datasetList = {...state.datasetList, ui: {selectDatasetIndex: action.payload}}
        sortingData = sortingDataTransform(state.datasetList.data[action.payload].definition)
        return {...initialState, 
            datasetList, sorting: {
                ...state.sorting, data: sortingData, output: [], ui: {
                    sortingDropdownNum: 1,
                    sorting: [
                        {
                            sortby: -1,
                            order: -1
                        }
                    ]
                }
            },
            http: state.http
        }
    case DATASET_LIST_ACTIONS.SET_DATASET_LIST:
        datasetList = {
            data: action.payload, 
            ui: {
                selectDatasetIndex: 0
            }
        }
        sortingData = sortingDataTransform(action.payload[0].definition)
        return {...initialState, 
            datasetList,
            sorting:{ ...state.sorting, data: sortingData },
            http: state.http
        }
    default:
        return allSubReducers(state, action)
    }
}

export default rootReducer
