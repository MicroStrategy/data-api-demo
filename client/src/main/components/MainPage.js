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
            <div className="QP__context">
                <div className="QP__context__left">
                    <div className="QP__conditions__title">Datasets</div>
                    <div className="QP__attributes-metrics-area__list">
                        <DatasetDropListContainer />
                    </div>

                    { !dataIsEmpty && (<div className="QP__conditions">
                        <div className="QP__conditions__viewFilters">
                            <div className="QP__conditions__title">View Filters</div>
                            <FilterSummaryContainer isViewFilter={true}/>    
                        </div>    
                        <div className="QP__conditions__metrics">
                            <div className="QP__conditions__title">Metric Limits</div>
                            <FilterSummaryContainer isViewFilter={false}/>
                        </div>
                        <SortingListGroupContainer />                    
                        <div className="QP__action">
                        <Button className="QP__apply-bar__button" onClick={() => onApplyCondition()}>Apply</Button>
                        </div>
                    </div>)
                    }                    

                </div>
                <div className="QP__context__right"> 
                    { !dataIsEmpty && (<div className="QP__conditions">
                        <AttributeMetricArea />
                    </div>)}                    
                </div>
            </div>
        </div>
    )
}

export default MainPage
