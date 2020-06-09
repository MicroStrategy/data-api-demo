import React from 'react'

import '../../../include/bootstrap'
import FilterEditorContainer from './FilterEditorContainer';

import './FilterSummary.scss'

class FilterSummary extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showEditorModal: false,
            isViewFilter: this.props.isViewFilter,
            viewFilterSummary: this.props.viewFilterSummary,
            metricLimitSummary: this.props.metricLimitSummary
        }   
    }

    

    render() {
        let isViewFilter = this.state.isViewFilter
        let summary = isViewFilter ? this.props.viewFilterSummary : this.props.metricLimitSummary
        
        const handleShowEditor = (expressionIndex, targetObjectId) => {
            this.setState({ 
                showEditorModal: true,
                expressionIndex,
                targetObjectId
            });
        }

        const handleCloseEditor = () => {
            this.setState({ 
                showEditorModal: false,
                expressionIndex: undefined
            })
        }

        const handleDeleteExpression = (event, index, isViewFilter, metricId) => {
            event.stopPropagation()
            this.props.onDeleteAnExpression(index, isViewFilter, metricId)
        }

        const summaryContentUI = () => {
            if (this.state.isViewFilter) {
                return (summary.map((expressionContent, index) =>
                     <div key={index} className="filter-list-item" onClick={() => {handleShowEditor(index, '000')}}>
                        <div className="filter-list-item-content">{expressionContent} </div>
                        <span
                            onClick={(evt) => handleDeleteExpression(evt, index, isViewFilter, '000')} 
                            className="filter-list-item-close QP__delete__icon">
                        </span>
                    </div>
                 ))
            }else{
                let uiResult = [];
                for(let metricId in summary){
                    uiResult.push(summary[metricId].map((metricIdSummaryline, index)=>
                     (<div key={metricId+index} className='filter-list-item' onClick={() => {handleShowEditor(index, metricId)}}>
                        <div className="filter-list-item-content">{metricIdSummaryline}</div>
                        <span
                            onClick={(evt) => handleDeleteExpression(evt, index, isViewFilter, metricId)}
                            className="filter-list-item-close QP__delete__icon">
                        </span>
                     </div>)))
                }
                return uiResult
            }
        }
                
        return (
            <div className="filter-list-div">
                <div className="filter-title-div">
                    <div className="filter-title-new" onClick={() => {handleShowEditor()}}>New</div>
                    <span className="filter-title-clear" onClick = {() => {this.props.onClearAllFilterExpressions(isViewFilter)}}>Clear All</span>
                </div>
                <div className="filter-list-list">
                    {summaryContentUI()}
                </div>
                <FilterEditorContainer isViewFilter={isViewFilter}
                 show={this.state.showEditorModal} handleCloseEditor={handleCloseEditor}
                 expressionIndex={this.state.expressionIndex}
                 targetObjectId={this.state.targetObjectId}
                 needChange={this.state.needChange}
                 />
            </div>
        )
    }


}

export default FilterSummary
