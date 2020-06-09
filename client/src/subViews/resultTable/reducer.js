// import C from '../constants'
// import initialState from './initialState'
// import {TOGGLE_METRIC_SELECTION, TOGGLE_ALL_METRICS} from './actions'

import initialState from '../../initialState'
import demoConfig from '../../config'
import {getTableData} from '../../utils/transformResult'
import {RESULT_ACTIONS} from '../../constants'


const PAGE_SIZE = demoConfig.itemPerPage

const reducer = (state=initialState.resultTable, action = {}) => {
  switch(action.type){
  case RESULT_ACTIONS.REFRESH_INSTANCE_ID:
    // This action is specially used for select in elements
    return {
      ...state,
      instanceId: action.payload.instanceId,   // Used for get attribute element
    }
  case RESULT_ACTIONS.REFRESH_RESULT_PANEL:
   // console.log(action.payload);
    const data = action.payload
    const paging = data.data.paging
    const currentPageIndex = paging.offset / demoConfig.itemPerPage
    // When recreating instance, we need to clear the data of all pages
    const newData = (currentPageIndex === 0)? [] : [...state.data]
    const totalPageCount = Math.ceil(paging.total/PAGE_SIZE)
    newData[currentPageIndex] = getTableData(data)
    return {
      data: newData, 
      instanceId: data.instanceId,   // Used for get attribute element
      ui: {
        currentPageIndex,
        totalPageCount,
        loading: false
      }
    }
  case RESULT_ACTIONS.GO_TO_PAGE:
    const pageIndex = action.payload
    return {
      ...state,
      ui: {
        ...state.ui,
        currentPageIndex: pageIndex,
      }
    }
  case RESULT_ACTIONS.BEGIN_LOADING_PAGE:
    return {
      ...state,
      ui: {
        ...state.ui,
        loading: true
      }
    }
  default:
    return state;
  }
}

export default reducer;