import React from 'react'
import DatasetDropListContainer from '../../subViews/datasetList/components/DatasetDropListContainer'
import FilterSummaryContainer from '../../subViews/filters/components/FilterSummaryContainer';
import SortingListGroupContainer from '../../subViews/sorting/components/SortingListGroupContainer'
import HttpBoardContainer from '../../subViews/httpBoard/components/HttpBoardContainer'
import AttributeMetricArea from '../../subViews/AttributeMetricArea'
import ResultTableContainer from '../../subViews/resultTable/components/ResultTableContainer'
import {Alert, Button} from 'react-bootstrap'

import './MainPage.scss'


const MainPage = ({
    dataIsEmpty,
    latestError,
    showError,
    onApplyCondition,
    onHideErrorMessage
}) => {
    return (
        <div className="quality-play-app">
            {showError && <Alert className="pop-alert" bsStyle="danger" onDismiss={onHideErrorMessage}>
                {latestError}
            </Alert>}
            <div className="QP__title">
                <div className="QP__title__icon qp-mstr-icon"></div>
            </div>
            <div className="QP__context">
                <div className="QP__context__left">
                    <DatasetDropListContainer />
                    { !dataIsEmpty && (<div className="QP__conditions">
                        <AttributeMetricArea />
                        <div className="QP__conditions__viewFilters">
                            <div className="QP__conditions__title">View Filters</div>
                            <FilterSummaryContainer isViewFilter={true}/>    
                        </div>    
                        <div className="QP__conditions__metrics">
                            <div className="QP__conditions__title">Metric Limits</div>
                            <FilterSummaryContainer isViewFilter={false}/>
                        </div>
                        <SortingListGroupContainer />                    
                    </div>)}                    
                    { !dataIsEmpty && (<div className="QP__apply-bar">
                        <Button className="QP__apply-bar__button" onClick={() => onApplyCondition()}>Apply</Button>
                    </div>)}
                </div>
                <div className="QP__context__right"> 
                    <ResultTableContainer />
                    <div className="QP__https">
                        <HttpBoardContainer />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MainPage
