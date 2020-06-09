import initialState from '../../initialState'

import {FILTER_ACTIONS} from  '../../constants'

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
    switch(action.type){
    case FILTER_ACTIONS.MODIFY_ATTRIBUTE_ELEMENTS:
        const {data, attributeId} = action.payload
        const newData = [...state.data]
        const currentDataset = newData[state.ui.selectDatasetIndex]
        const attributeIndex = currentDataset.definition.availableObjects.attributes.findIndex((attribute) => {
            return attribute.id === attributeId
        })
        currentDataset.definition.availableObjects.attributes[attributeIndex].elements = data
        return {
            ...state, 
            data: newData 
        }
    default:
        return state
    }
}

export default reducer