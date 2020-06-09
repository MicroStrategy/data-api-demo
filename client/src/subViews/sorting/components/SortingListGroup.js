import React from 'react'
import _ from 'lodash'

import '../../../include/bootstrap'
import './SortingListGroup.scss'

import { DropdownButton, ListGroup, ListGroupItem, MenuItem, OverlayTrigger, Tooltip } from 'react-bootstrap'

class SortingListGroup extends React.Component {

    onSortingElemetsSelectChange(elementNum, eventKey) {
        const { ui, onChangeSortingElement, onChangeSortingOutputData, onChangeSortingChoice } = this.props
        const { sorting } = ui
        sorting.forEach(
            (d, i) => {
                if (i === elementNum) {
                    if (eventKey === d.sortby) {
                        return
                    }
                    else {
                        onChangeSortingElement(elementNum, eventKey)
                        //give a default value for sorting choice
                        onChangeSortingChoice(elementNum, 0)
                        //change output data
                        onChangeSortingOutputData(elementNum)
                        //add new dropdown box
                        if (elementNum === ui.sortingDropdownNum - 1) {
                            this.onAddDropdownAction()
                        }
                    }
                }
            }
        )
    }
    onSortingChoiceSelectChange(elementNum, eventKey) {
        const { ui, onChangeSortingChoice, onChangeSortingOutputData } = this.props
        const { sorting } = ui
        sorting.forEach(
            (data, i) => {
                if (i === elementNum) {
                    if (eventKey === data.order) {
                        return
                    }
                    else {
                        onChangeSortingChoice(elementNum, eventKey)
                        onChangeSortingOutputData(elementNum)
                    }
                }
            }
        )
    }
    onAddDropdownAction() {
        const { onAddSortingDropdown } = this.props
        onAddSortingDropdown(this.props.ui.sortingDropdownNum + 1)
    }
    getSortingElementTitle(index) {
        const { sorting } = this.props.ui
        if (this.hasSelectElement(index)) {
            return this.getElementName(this.props.data[sorting[index].sortby])
        } else {
            return this.props.data.length === 0 ? "Loading data" : ""
        }
    }
    isCurrentIndexSelected(index) {
        const { sorting } = this.props.ui
        if (this.hasSelectElement(index)) {
            return this.isElementSelected(this.props.data[sorting[index].sortby])
        } else {
            //no element select, show blank dropdown, no need display warning
            return true
        }
    }
    getSortingChoiceTile(index) {
        const { sorting } = this.props.ui
        if (sorting[index].order === 0) {
            return "Ascending"
        } else if (sorting[index].order === 1) {
            return "Descending"
        } else {
            return ""
        }
    }
    isAttribute(index) {
        const { data } = this.props
        return data[index].type === "attribute"
    }
    hasSelectElement(index) {
        const { sorting } = this.props.ui
        return sorting[index].sortby >= 0
    }
    useDefaultSortingOrder(index) {
        const { sorting } = this.props.ui
        if (this.hasSelectElement(index) && this.isAttribute(sorting[index].sortby)) {
            return true;
        } else {
            return false;
        }
    }
    getElementName(element) {
        if (element.type === "attribute") {
            return element.attribute.name;
        } else if (element.type === "metric") {
            return element.metric.name;
        } else if (element.type === "form") {
            return element.attribute.name + "-" + element.form.name
        }
    }
    onDeleteDropdownButtonClick(index) {
        const { onDeleteSortingDropdown } = this.props
        onDeleteSortingDropdown(index)
    }
    onClearSortingStateButtonClick() {
        const { onClearSortingState } = this.props
        onClearSortingState()
    }

    isElementSelected(element) {
        const { attributes, metrics } = this.props
        if (element.type === "attribute" || element.type === "form") {
            return !_.get(attributes, `ui.unselect.${element.attribute.id}`, false)
        } else {
            return !_.get(metrics, `ui.unselect.${element.metric.id}`, false)
        }
    }
    render() {
        const { sorting, sortingDropdownNum } = this.props.ui
        const { data } = this.props
        const selectedElement = this.props.ui.sorting.map(e => e.sortby)
        const elementDropDownIsDisabled = this.props.data.length === 0
        return (
            <div className="QP__sorting">
                <div className="QP__conditions__title">Advance Sort</div>
                <div className="QP__sorting__table">
                    <div className="QP__sorting__table__index">
                        <div className="QP__sorting__table__order">Order</div>
                        <div className="QP__sorting__table__sort">Sort by</div>
                        <div className="QP__sorting__table__clear" onClick={e => this.onClearSortingStateButtonClick()}>Clear All</div>
                    </div>
                    <div className="QP__sorting__table__content">
                        <ListGroup className="QP__sorting__table__row">
                            {[...Array(sortingDropdownNum).keys()].map(i => {
                                const selected = this.isCurrentIndexSelected(i)
                                return <ListGroupItem key={i} className="QP__sorting__table__row__item">
                                    <div className="QP__sorting__table__row__index">{i + 1}</div>
                                    <div className="QP__sorting__table__row__element_group">
                                        <DropdownButton className={selected ? "QP__sorting__table__row__elementButton" : "QP__sorting__table__row__unselected__elementButton"} dropup title={this.getSortingElementTitle(i)} disabled={elementDropDownIsDisabled} id="dropdown-size-medium">
                                            {
                                                data
                                                    .map((current, j) => {
                                                        return <MenuItem className={this.isElementSelected(current) ? "QP__sorting__table__row__elementMenu__Item" : "QP__sorting__table__row__elementMenu__Unselected__Item"} key={j} active={j === sorting[i].sortby} eventKey={j} onSelect={(ek) => this.onSortingElemetsSelectChange(i, ek)}>{this.getElementName(current)}</MenuItem>
                                                    })
                                                    .filter((element, index) => {
                                                        return !selectedElement.includes(index)
                                                    })
                                            }
                                        </DropdownButton>
                                    </div>
                                    <div className="QP__sorting__table__row__sorting_group">
                                        {this.useDefaultSortingOrder(i) ?
                                            <div className={selected ? "QP__sorting__table__row__default" : "QP__sorting__table__row__unselected__default"}>Default Order</div>
                                            :
                                            <DropdownButton className={selected ? "QP__sorting__table__row__sortingButton" : "QP__sorting__table__row__unselected__sortingButton"} dropup title={this.getSortingChoiceTile(i)} id="dropdown-size-medium" disabled={sorting[i].sortby < 0 || data[sorting[i].sortby].type === "attribute"} >
                                                {[...Array(2).keys()].map(j => {
                                                    return <MenuItem className="QP__sorting__table__row__sortingMenu__Item" key={j} active={j === sorting[i].order} eventKey={j} onSelect={(ek) => this.onSortingChoiceSelectChange(i, ek)}>{j === 0 ? "Ascending" : "Descending"}</MenuItem>
                                                })}
                                            </DropdownButton>
                                        }

                                    </div>
                                    {selected ? "" :
                                        <OverlayTrigger
                                            key="top"
                                            placement="top"
                                            overlay={
                                                <Tooltip id="tooltip-top">
                                                    Object is unselected
                                                </Tooltip>
                                            }
                                        >
                                            <div className="QP__warning__icon warning"></div>
                                        </OverlayTrigger>
                                    }
                                    {/* only check the last one */}
                                    {this.hasSelectElement(i) ? <div className="QP__sorting__table__row__delete QP__delete__icon" onClick={(e) => this.onDeleteDropdownButtonClick(i)}></div> : ""}
                                </ListGroupItem>
                            })}
                        </ListGroup>
                    </div>
                </div>
            </div>
        )
    }
}

export default SortingListGroup