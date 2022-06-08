import initialState from '../../initialState'

import {DATASET_LIST_ACTIONS,FILTER_ACTIONS} from  '../../constants'




const reducer = (state=initialState.datasetList, action = {}) => {
    let unselect = {}
    switch(action.type){
    case FILTER_ACTIONS.MODIFY_ATTRIBUTE_ELEMENTS:
            const {data, datasetId,attributeId} = action.payload
            const newData = [...state.data]
            for(var i=0;i<newData.length;i++)
            {
                if(newData[i].id === datasetId)
                {
                    const attributeIndex = newData[i].definition.availableObjects.attributes.findIndex((attribute) => {
                        return attribute.id === attributeId
                    })
                    newData[i].definition.availableObjects.attributes[attributeIndex].elements = data
        
                }
            }
            return {
                ...state, 
                data: newData 
            }    
    case DATASET_LIST_ACTIONS.TOGGLE_DATASET_SELECTION:
        unselect = {...state.ui.unselect}
        const id = action.payload
        if (id in unselect) {
            delete unselect[id]
        } else {
            unselect[id] = true
        }
        return {...state, ui: {unselect}}
    case DATASET_LIST_ACTIONS.TOGGLE_ALL_DATASETS:
        unselect = {}    
        const {datasets, select} = action.payload        
        if (!select) {
            // Unselect all, use all ids
            for (const dataset of datasets) {
                unselect[dataset.id] = true
            }            
        }
        return {...state, ui: {unselect}}
        //return {...initialState, datasetList:state}
    default:
        return state;
    }
}



export default reducer