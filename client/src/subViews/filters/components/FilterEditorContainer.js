import FilterEditor from './FilterEditor'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { addNewExpression, modifyExpression, getAttributeElement } from '../actions'
import { getCurrentDataset } from '../../../utils/stateUtils';
import { destructParamsFromANExistingExpression } from '../../../utils/filterUtils'


function mapStateToProps(state, props) {

    let selectFormIndex
    let operatorIndex
    let constant
    let isQualification
    let selectedListOptionIndex
    let selectedElementIndexs
    let isALLElementChecked
    let metricLimitTargetObjectId = ''


    const isViewFilter = props.isViewFilter || false
 

    let currentDataset = getCurrentDataset(state)
    let availableObjects = [...currentDataset.definition.availableObjects.attributes,...currentDataset.definition.availableObjects.metrics]

    if(!isViewFilter){ //metricLimit only support on metric object 
        availableObjects = availableObjects.filter((availableObject)=>{return availableObject.type==='metric'})
    }

    if(props.targetObjectId){
        metricLimitTargetObjectId = props.targetObjectId //target objectid just used in metric limits since metric limit 's json format is different with view filter
        if(!isViewFilter){
            availableObjects = availableObjects.filter((availableObject)=>{return availableObject.id === metricLimitTargetObjectId})
        }
    }
    console.log(props.expressionIndex)
    if (props.expressionIndex !== undefined) {
        //editor an existing expression
        let expressionIndex = parseInt(props.expressionIndex, 10)
        let result = destructParamsFromANExistingExpression(state, expressionIndex, isViewFilter,availableObjects,metricLimitTargetObjectId)
        result.show = props.show
        result.needChange = props.needChange
        console.log("result:", result)
        return result
    } else {
        // add an new expression
        selectFormIndex = 0
        operatorIndex = 0
        constant = ''
        isQualification = isViewFilter?isQualification: true
        selectedListOptionIndex = 0
        selectedElementIndexs = []
        isALLElementChecked = false

        //isEditing meaning here is adding an new expression or modify an exsting expression
        return ({
            needChange: props.needChange,
            show: props.show,
            expressionIndex:-1,
            isEditing:false,
            availableObjects,
            isViewFilter,
            selectedIndex:0,
            selectFormIndex,
            operatorIndex,
            constant,
            isQualification,
            selectedListOptionIndex,
            selectedElementIndexs,
            isALLElementChecked
        })
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        onAddNewExpression: addNewExpression,
        onModifyExpression: modifyExpression,
        onGetAttributeElement: getAttributeElement
    }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(FilterEditor)