import React from 'react'


import '../../../include/bootstrap'
import { Modal, DropdownButton, MenuItem } from 'react-bootstrap'

import {operators, listOptions} from '../../../utils/filterUtils'

import './FilterEditor.scss'

class FilterEditor extends React.Component {
    static getDerivedStateFromProps(props, state) {
        // Reload prop when the modal dialog is hide/show 
        if (props.show !== state.show){
            return {
                show: props.show,
                expressionIndex:props.expressionIndex,
                isEditing:props.isEditing,
                isViewFilter: props.isViewFilter,
                selectedIndex: props.selectedIndex,
                selectFormIndex: props.selectFormIndex,
                operatorIndex: props.operatorIndex,
                constant: props.constant,
                isQualification: props.isQualification,
                selectedListOptionIndex: props.selectedListOptionIndex,
                selectedElementIndexs: props.selectedElementIndexs,
                isALLElementChecked: props.isALLElementChecked,
                isOkButtonEnable:props.isEditing
            }
        }
        return state
    }
    
    constructor(props) {
        super(props)
        this.state = {
            show: false,
            expressionIndex:this.props.expressionIndex,
            isEditing:this.props.isEditing,
            isViewFilter: this.props.isViewFilter,
            selectedIndex: this.props.selectedIndex,
            selectFormIndex: this.props.selectFormIndex,
            operatorIndex: this.props.operatorIndex,
            constant: this.props.constant,
            isQualification: this.props.isQualification,
            selectedListOptionIndex: this.props.selectedListOptionIndex,
            selectedElementIndexs: this.props.selectedElementIndexs,
            isALLElementChecked: this.props.isALLElementChecked,
            isOkButtonEnable:this.props.isEditing
        }
    }

    render() {
        const availableObjects = this.props.availableObjects;
        if(availableObjects.length === 0){
            return <div></div>
        }
        
        let isAttributeSelected = false;

        let selectedIndex = this.state.selectedIndex

        isAttributeSelected = (availableObjects[selectedIndex].type || "").toLowerCase() === "attribute"

        const createNewExpression = () => {
            return (
                <div>
                    <input type="text" placeholder="Please input constant" onChange={(e) => { this.ConstantValueChange(e) } } value={this.state.constant} />
                </div>
            );
        }

 
        const constructChooseElementsPart = () => {
            let chooseElementPart;
            let availableOptionsAndChooseElementPart;
            let availableForms;
            let availableListOptions;
            let availableOptions;
            if (isAttributeSelected&&this.state.isViewFilter) {
                chooseElementPart =
                    <div>
                        <div className="grey-label">Choose elements by</div>
                        <DropdownButton className="QP__filter__editor__DropDown" title={this.state.isQualification?'Qualification On':'Selecting in list'} id="dropdown-size-medium">
                            <MenuItem className="QP__filter__editor__MenuItem" key={0} active={this.state.isQualification} eventKey={0} onSelect={(ek) => this.isQualificationSelectChange(ek)}>Qualification On</MenuItem>
                            <MenuItem className="QP__filter__editor__MenuItem" key={1} active={!this.state.isQualification} eventKey={1} onSelect={(ek) => this.isQualificationSelectChange(ek)}>Selecting in list</MenuItem>
                        </DropdownButton>
                    </div>

                availableForms = availableObjects[this.state.selectedIndex].forms.map((form, index) =>
                    <div className="custom-radio-container" key={index}>
                        <div className="custom-control custom-radio" onClick={(e) => this.state.selectFormIndex !== index ? this.formSelectChange(index) : ""}>
                             <input type="radio" className="custom-control-input" name="attributeForms" id={'attributeForms'+ index} value={index}
                             checked={this.state.selectFormIndex === index} readOnly/>
                            <div className={`QP__item-icon ${this.state.selectFormIndex === index? "qp-radio-check-icon" : "qp-radio-uncheck-icon"}`}/>
                            <span className="custom-control-label" htmlFor={'attributeForms' + index} onClick={(e) => this.state.selectFormIndex !== index ? this.formSelectChange(index) : ""}>{form.name}</span>
                        </div>
                    </div>);

                availableListOptions = listOptions.map((listOption, index) =>
                    <div className="custom-radio-container" key={index}>
                        <div className="custom-control custom-radio" onClick={(e) => this.state.selectedListOptionIndex !== index ? this.listOptionSelectChange(index) : ""}>
                            <input type="radio" className="custom-control-input" name="listOptions" id ={'listOptions'+index} value={index} ref = {'listOptions'+ index}
                            checked={this.state.selectedListOptionIndex === index} readOnly/>
                            <div className={`QP__item-icon ${this.state.selectedListOptionIndex === index? "qp-radio-check-icon" : "qp-radio-uncheck-icon"}`}/>
                            <span className="custom-control-label" htmlFor={"listOptions" + index}>{listOption.name}</span>
                        </div><br />
                    </div>);
                if (this.state.isQualification) {
                    availableOptions = availableForms;

                } else {
                    availableOptions = availableListOptions;
                }
                availableOptionsAndChooseElementPart = <div className = "QP__filter__editor__choosePart"><div>{chooseElementPart}</div><div className = "QP__filter__editor__selectPart">{availableOptions}</div></div>
            } else {
                availableOptionsAndChooseElementPart = <div></div>
            }
            return availableOptionsAndChooseElementPart
        }
        
        const middlePartInFilterUI = () => {
            if ((!this.state.isQualification)&&isAttributeSelected&&this.state.isViewFilter) {
                const attribute = this.props.availableObjects[this.state.selectedIndex]    
                const elements = attribute.elements
                return (<div className="QP__filter-editor__middle">
                    {elements && <div className="element-list-header" onClick={(e) => this.clickAllElements()}>
                        <input className = "QP__filter__editor__list__header__input" type='checkbox' name='chooseMutltiElements' value='All' checked={this.state.isALLElementChecked} ref='AllElements' readOnly/>
                        <div className={`QP__item-icon ${this.state.isALLElementChecked? "qp-multi-check-icon" : "qp-multi-uncheck-icon"}`}/>
                        <div className = "element-span-wrapper">All</div>
                    </div>}
                    <div className="element-list">
                        {elements && elements.map((element, index) => {
                            return <div key={index} className="element-item" onClick={(e) => this.clickMultiElementSpan(index)}>
                                <input className = "QP__filter__editor__list__element__input" type='checkbox' name='chooseMutltiElements' value={index}
                                    checked={(this.state.selectedElementIndexs.find((selectedElementIndex) => {
                                        return selectedElementIndex === index
                                    })) >= 0} onChange={(e) => { this.clickMultiElementOption(index) }}
                                    ref={element.name} readOnly/>
                                <div className={`QP__item-icon ${(this.state.selectedElementIndexs.find((selectedElementIndex) => {
                                    return selectedElementIndex === index
                                })) >= 0 ? "qp-multi-check-icon" : "qp-multi-uncheck-icon"}`} />
                                <div className = "element-span-wrapper">{element.name}</div>
                            </div>
                        })}
                    </div>
                </div>) 
            } else {
                return (
                    <div className="QP__filter-editor__middle qualification-on">
                        <div className="grey-label">Based On</div>
                        <ul id="operatorsUlId" className="list-group">
                            {operators.map((operator, index) => {
                                const selectedClass = this.state.operatorIndex === index?"selected":""
                                return <li className={`${selectedClass} client-list-group-item client-list-group-item-action client-li`}
                                           key={index}
                                           onClick={(e)=>this.onOperatorOptionclick(e) }
                                           value={index}
                                           tabIndex="1">
                                    {operator.name}
                                    </li> })}
                        </ul>
                    </div>)
            }

        }



        const rightPatrInFilterUI = () => {
            if ((!this.state.isQualification)&&isAttributeSelected&&this.state.isViewFilter) {
                return <div></div>
            } else {

                return (
                    <div>
                        <div className="grey-label">Based on</div>
                        <div>
                            {createNewExpression()}
                        </div>
                    </div>)
            }
        }

        let editTitleContent = this.state.isEditing? 'Edit':'New'
        let titlePart = this.state.isViewFilter?'View Filter':'Metric limit'
        return (
            <Modal className="QP__filter-editor" backdrop="static" show={this.props.show}
             onEntered={() => {this.onEntered()}}
             onHide={() => {this.onClose()}}>
                <Modal.Header closeButton>
                    <Modal.Title>
                    <div className="dialogue-title-bar">
                        <h2 className="title-bar-text">{`${editTitleContent} ${titlePart}`}</h2>
                    </div>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="QP__filter-editor__body">
                        <div className="QP__filter-editor__left">
                            <div className="grey-label">Based on</div>
                                <DropdownButton className={`QP__filter__editor__DropDown QP__filter__editor__attribute-btn 
                                 ${(availableObjects[this.state.selectedIndex].type || "").toLowerCase() === "attribute" ? "attribute" : "metric"}`} 
                                 title={this.state.selectedIndex>=0?availableObjects[this.state.selectedIndex].name:''} id="dropdown-size-medium">
                                    {availableObjects.map(
                                        (availableObject,index)=> 
                                        (<MenuItem className={`QP__filter__editor__MenuItem ${(availableObject.type || "").toLowerCase() === "attribute" ? "attribute" : "metric"}`}
                                         key={index} active={index === this.state.selectedIndex} eventKey={index} onSelect={(ek) => this.targetObjectSelectChange(ek)}>
                                          {availableObject.name}
                                        </MenuItem>)
                                    )}
                                </DropdownButton>
                                <div>
                                    {constructChooseElementsPart()}
                                </div>
                            </div>
                        {middlePartInFilterUI()}
                        <div className="QP__filter-editor__right">
                            {rightPatrInFilterUI()}
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>                      
                    <div>
                        <button className="btn btn-primary" disabled={!this.state.isOkButtonEnable}
                                onClick={() => { this.onClickOK() }}>OK</button>
                        <button className="btn btn-default btn-outline-secondary" onClick={() => {this.onClose()}}>Cancel</button>                    
                    </div>
                </Modal.Footer>  
            </Modal>
        )
    }

    onOperatorOptionclick(e) {
        this.setState({ operatorIndex: parseInt(e.target.value) })
    }

    ConstantValueChange(e) {
        const constant = e.target.value
        let isOkButtonEnable = true
        if(constant.length === 0){
            isOkButtonEnable = false
        }

        this.setState({ constant, isOkButtonEnable})
    }

    targetObjectSelectChange(e){
        this.setState({ 
            selectedIndex: e,
            isQualification:true
         });
    }

    formSelectChange(index) {
        this.setState({ selectFormIndex: index });
    }


    isQualificationSelectChange(e) {
        if(e===0){
            this.setState({ isQualification: true });
        } else{
            this.setState({ isQualification: false });
            this.getAttributeElements(true)
        }
    }

    listOptionSelectChange(index) {
        this.setState({ selectedListOptionIndex: index })
    }

    getCheckBoxElementName(index){
        const attribute = this.props.availableObjects[this.state.selectedIndex]
        return attribute.elements[index].name;
    }
    clickMultiElement(index,needCheck){
        let newSelectedElementIndexs

        newSelectedElementIndexs = this.state.selectedElementIndexs.filter(selectElement => selectElement !== index);
        if (needCheck) {
            newSelectedElementIndexs = [...newSelectedElementIndexs, index];
        } else{
            if(this.state.isALLElementChecked){
                this.setState({
                    isALLElementChecked:false
                })
            }
        }

        this.setState({ selectedElementIndexs: newSelectedElementIndexs})
        let isOkButtonEnable = true
        if(newSelectedElementIndexs.length===0){
            isOkButtonEnable = false
        }
        this.setState({isOkButtonEnable})
    }

    clickMultiElementSpan(index){
        this.clickMultiElement(parseInt(index,10),!this.refs[this.getCheckBoxElementName(parseInt(index,10))].checked)
    }

    clickMultiElementOption(index) {
        this.clickMultiElement(parseInt(index,10),this.refs[this.getCheckBoxElementName(parseInt(index,10))].checked)
    }

    clickAllElements(){
       if(!this.state.isALLElementChecked){
           let newSelectedElementIndexs=[];
           const elements = this.props.availableObjects[this.state.selectedIndex].elements
           elements.forEach((element,index)=>{
               newSelectedElementIndexs.push(index)
           })
          this.setState({
            isALLElementChecked: true,
            selectedElementIndexs:newSelectedElementIndexs,
            isOkButtonEnable:true
          })

       }else{
           this.setState({
             isALLElementChecked: false,
             selectedElementIndexs:[],
             isOkButtonEnable:false
           })
       }

    }

    getAttributeElements(changingToSelectInList) {
        let availableObjects = this.props.availableObjects;
        let isAttributeSelected = false;

        let selectedIndex = this.state.selectedIndex

        isAttributeSelected = (availableObjects[selectedIndex].type || "").toLowerCase() === "attribute" ? true : false

        if (isAttributeSelected && (changingToSelectInList || !this.state.isQualification) && !availableObjects[selectedIndex].elements){
            this.props.onGetAttributeElement(availableObjects[selectedIndex].id)
        }
    }

    onEntered(){
        this.getAttributeElements()
    }

    onClose(){
        this.props.handleCloseEditor()
    }

    onClickOK(){
        this.onClickAddOrModifyExpression()
        this.onClose()
    }

    onClickAddOrModifyExpression(){       
        let availableObjects = this.props.availableObjects;
        let selectedIndex = this.state.selectedIndex      

        let selectedElements = []
        let isAttributeSelected= (availableObjects[selectedIndex].type || "").toLowerCase() === "attribute" ? true : false


        this.state.selectedElementIndexs.forEach((selectedElementIndex)=>{selectedElements.push(availableObjects[selectedIndex].elements[selectedElementIndex])})

        //in the metric limit expression edit condition,the targetObject and metricLimitTargetObject can be different
        let rawExpessionData = {
            operator: operators[this.state.operatorIndex].name,
            targetObject: availableObjects[selectedIndex],
            selectAttributeForm: isAttributeSelected ? availableObjects[selectedIndex].forms[this.state.selectFormIndex] : 0,
            constant: this.state.constant,
            isQualification: this.state.isQualification,
            selectedElements: selectedElements,
            selectedListOperator: listOptions[this.state.selectedListOptionIndex],
            expressionIndex: this.state.expressionIndex,
            isViewFilter:this.state.isViewFilter,
            metricLimitTargetObjectId:this.props.metricLimitTargetObjectId
        }

        if(this.state.isEditing){
            this.props.onModifyExpression(rawExpessionData)
        }else{
            this.props.onAddNewExpression(rawExpessionData)
        }

    }

}

export default FilterEditor
