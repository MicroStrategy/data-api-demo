export const operators = [{ name: "Greater", value: ">" }, { name: "Less", value: "<" }, { name: "Equals", value: "=" }, { name: "NotEqual", value: "!=" }, { name: "BeginsWith", value: "..." }, { name: "Contains", value: "<>" }, { name: "Like", value: "..." }]
export const listOptions = [{ name: "In List", value: "In" }, { name: "Not In List", value: "NotIn" }]

export const contructNewExpressionFromRawdata = (rawExpressionData)=>{
	console.log("rawExpressionData ", rawExpressionData.operator)

	let expressionIndex = rawExpressionData.expressionIndex;
	let isAttribute = rawExpressionData.targetObject.type === "Attribute" ? true : false
	let targetObject = rawExpressionData.targetObject
	let formName = isAttribute ? rawExpressionData.selectAttributeForm.name : ""

	let isQualification = rawExpressionData.isQualification
	let selectedElements = rawExpressionData.selectedElements
	let selectedListOperator = rawExpressionData.selectedListOperator


	let firstOperand
	let secondOperand
	let newExpression
	let contentDisplay

	if (isQualification) {
		contentDisplay = targetObject.name + (isAttribute ? ' @' + formName : '') + ' ' + rawExpressionData.operator + ' ' + rawExpressionData.constant

		if (isAttribute) {
			firstOperand = {
				type: "form",
				attribute: {
					id: targetObject.id,
					name: targetObject.name
				},
				form: {
					id: rawExpressionData.selectAttributeForm.id,
					name: rawExpressionData.selectAttributeForm.name
				}
			}

			secondOperand = {
				type: "constant",
				dataType: "Char",
				value: rawExpressionData.constant
			}

		} else {
			firstOperand = {
				type: "metric",				
				id: targetObject.id,
				name: targetObject.name
			}

			secondOperand = {
				type: "constant",
				dataType: "Real",
				value: rawExpressionData.constant
			}
		}


		newExpression = {
			contentDisplay: contentDisplay,
			expression: {
				operator: rawExpressionData.operator,
				operands: [
					firstOperand,
					secondOperand
				]
			}
		}
	} else {
		let selectedElementNames = selectedElements.map((element)=>{return element.name}).join(',')
		
		contentDisplay = targetObject.name  + ' ' + selectedListOperator.name + ' ' + selectedElementNames

		firstOperand = {
			type: "attribute",
			id: targetObject.id,
			name: targetObject.name
		}

		secondOperand ={
			type:"elements",
			elements: selectedElements
		}

		newExpression = {
			contentDisplay: contentDisplay,
			expression: {
				operator: selectedListOperator.value,
				operands: [
					firstOperand,
					secondOperand
				]
			}
		}
	}

	newExpression.expressionIndex = expressionIndex
	newExpression.targetObjectId = targetObject.id
	newExpression.isViewFilter =  rawExpressionData.isViewFilter
	return newExpression
}

const destructParamsFromQualificationExpression = (isViewFilter,firstOperand,secondOperand,operator,availableObjects,metricLimitTargetObjectId) =>{
	let selectedIndex =0
	let operatorIndex =0
	let constant = ''
	let selectFormIndex = 0

	let targetObjectId
	let isAttribute = (firstOperand.type !== 'metric')
	let formId

	if(isViewFilter){
			if (isAttribute) {
					targetObjectId = firstOperand.attribute.id
					formId = firstOperand.form.id
			} else {
					targetObjectId = firstOperand.id
			}
	}else{
			targetObjectId = metricLimitTargetObjectId
	}

	selectedIndex = availableObjects.findIndex((availableObject) => { return availableObject.id === targetObjectId });
	if (isAttribute) {
			selectFormIndex = availableObjects[selectedIndex].forms.findIndex((form => { return form.id === formId }))
	}
	operatorIndex = operators.findIndex(operatorElement => { return operatorElement.name === operator })
	constant = secondOperand.value

	return {
			selectedIndex,
			operatorIndex,
			selectFormIndex,
			constant
	}
}

export const destructParamsFromANExistingExpression = (state, expressionIndex, isViewFilter,availableObjects,metricLimitTargetObjectId) => {
	let expression
	if(isViewFilter){
			expression = state.filters.viewFilter.expressions.operands[expressionIndex]
	}else{
			expression = state.filters.metricLimits.expressions[metricLimitTargetObjectId].operands[expressionIndex]
	}

	let selectedIndex = 0
	let selectFormIndex = 0
	let operatorIndex = 0
	let constant = ''
	let isQualification = false
	let selectedListOptionIndex = 0
	let selectedElementIndexs = []
	let isALLElementChecked = false

	let firstOperand = expression.operands[0]
	let secondOperand = expression.operands[1]
	let targetObjectId
	let operator = expression.operator

	if (isViewFilter) {
			isQualification = !(listOptions.findIndex(listOption=>{return listOption.value === operator}) >= 0)

			if (isQualification) {
					({selectedIndex,operatorIndex,selectFormIndex,constant}= destructParamsFromQualificationExpression(isViewFilter,firstOperand,secondOperand,operator,availableObjects,metricLimitTargetObjectId))
			} else {
					targetObjectId = firstOperand.id;//targetobject must be an attribute
					selectedIndex = availableObjects.findIndex((availableObject) => { return availableObject.id === targetObjectId });
					selectedListOptionIndex = listOptions.findIndex(listOption => { return operator === listOption.value }) 
					let selectedElements = secondOperand.elements
					selectedElements.forEach((selectedElement) => {
							let index = availableObjects[selectedIndex].elements.findIndex(element => { return element.id === selectedElement.id })
							if (index >= 0) {
									selectedElementIndexs.push(index)
							}
					});

					isALLElementChecked = (selectedElementIndexs.length === availableObjects[selectedIndex].elements.length) ? true : false
			}
	}else{  
			isQualification = true ;//metric limit only support qualification   
			({selectedIndex,operatorIndex,selectFormIndex,constant} = destructParamsFromQualificationExpression(isViewFilter,firstOperand,secondOperand,operator,availableObjects,metricLimitTargetObjectId))
	}

	return ({
			metricLimitTargetObjectId,
			expressionIndex,
			isEditing:true,
			availableObjects,
			isViewFilter,
			selectFormIndex,
			operatorIndex,
			constant,
			isQualification,
			selectedListOptionIndex,
			selectedElementIndexs,
			isALLElementChecked,
			selectedIndex
	})

}