// import C from '../constants'
// import initialState from './initialState'
import {ATTRIBUTES_ACTIONS} from '../../constants'
import initialState from '../../initialState'

const reducer = (state=initialState.attributes, action = {}) => {
    let unselect = {}
    switch(action.type){
    case ATTRIBUTES_ACTIONS.TOGGLE_ATTRIBUTE_SELECTION:
        unselect = {...state.ui.unselect}
        const attributeId = action.payload
        if (attributeId in unselect) {
            delete unselect[attributeId]
        } else {
            unselect[attributeId] = true
        }
        return {...state, ui: {unselect}}
    case ATTRIBUTES_ACTIONS.TOGGLE_ALL_ATTRIBUTES:
        unselect = {}    
        const {attributes, select} = action.payload        
        if (!select) {
            // Unselect all, use all ids
            for (const attribute of attributes) {
                unselect[attribute.id] = true
            }            
        }
        return {...state, ui: {unselect}}
    default:
        return state;
    }
}

export default reducer;