import initialState from '../../initialState'

import {DATASET_LIST_ACTIONS,FILTER_ACTIONS} from  '../../constants'

//fake data here TODO huiwang
/*
    let attribute1 = {
        name: "Category",
        id: "8D679D3711D3E4981000E787EC6DE8A4",
        type: "Attribute",
        forms: [
            {
                id: "CCFBE2A5EADB4F50941FB879CCF1721C",
                name: "DESC",
                dataType: "Char"
            },
            {
                id: "45C11FA478E745FEA08D781CEA190FE5",
                name: "ID",
                dataType: "Real"
            }
        ],
        elements:[{ id: "h2;8D679D3711D3E4981000E787EC6DE8A4", name: "Movies" }, { id: "h1;8D679D3711D3E4981000E787EC6DE8A4", name: "Books" }]
    }
    
    let metric1 = {

        name: "Revenue",
        id: "4C05177011D3E877C000B3B2D86C964F",
        type: "Metric"
    }

    let metric2 = {
        name: "Cost",
        id: "C105177011D3E877C000B3B2D86C9667",
        type: "Metric"
    }


let availableObjects = [attribute1, metric1,metric2]

const initialState = {
    data: [],
    ui: {},
    availableObjects: availableObjects
    
}
*/



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