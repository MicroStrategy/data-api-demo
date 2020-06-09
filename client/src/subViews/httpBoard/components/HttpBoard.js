import React from 'react'
import JSONPretty from 'react-json-pretty'
import './HttpBoard.scss'
import {getQueryString} from '../../../utils/utils'

const TAB_HEADER = ['Headers', 'Response']

class HttpBoard extends React.Component {
    componentDidUpdate() {
   
    }

    selectRequest(index) {
        if(this.props.ui.selectRequestIndex === index) {
            return
        }
        this.props.onSelectRequest(index)
    }

    selectDetailTab(index) {
        if(this.props.ui.selectDetailTab === index) {
            return
        }
        this.props.onSelectDetailTab(index)
    }

    generateHeadersTabContent(request) {
        return <div className="QP__httpBoard__headers">
            <div className="headers-lv-one">General</div>
            <div className="headers-lv-two">
                <span className="headers-lv-two__title">URL:</span>
                {request.url + getQueryString(request.params)}
            </div>
            <div className="headers-lv-two">
                <span className="headers-lv-two__title">Method:</span>
                {request.method.toUpperCase()}
            </div>
            <div className="headers-lv-one">Request Headers</div>
                {request.requestHeader && 
                    Object.keys(request.requestHeader).map((headerKey) => {
                        return <div key={headerKey} className="headers-lv-two">
                            <span className="headers-lv-two__title">{headerKey}:</span>
                            {request.requestHeader[headerKey]}
                        </div>
                    })    
                }
            
            <div className="headers-lv-one">Request Body</div> 
            {request.requestData && <JSONPretty json={request.requestData}></JSONPretty>}
        </div>
    }

    generateResponseTabContent(request) {
        return <JSONPretty json={request.responseBody}></JSONPretty>
    }

    render() {
        const {
            data, 
            ui
        } = this.props
        const {selectRequestIndex, selectDetailTab} = ui
        const hasSelectedOneRequest = (selectRequestIndex !== undefined)
        const getTabSelectedClass = (tabIndex) => {
            return (selectDetailTab === tabIndex) ? "selected" : "unselected"
        }

        // console.log(JSON.stringify(data))

        return (
            <div className="QP__httpBoard">
                <div className={`QP__httpBoard__request-urls ${hasSelectedOneRequest ? "" : " url-only"}`}>
                    <div className="QP__httpBoard__title QP__httpRequests">
                        <div>HTTP Requests</div>
                        <div className="QP__httpBoard__title__clear"
                         onClick={()=>this.props.onClearRequests()}>Clear All</div>
                    </div>
                    <div className="QP__httpBoard__content">
                    {
                        data.map((e, index) => {
                            const selectClass = (index === selectRequestIndex)?"selected":""
                            return (<div key={index} ref={(lastUrlItem) => {if(index === data.length - 1){this.lastUrlItem = lastUrlItem}}} 
                                onClick={() => this.selectRequest(index)}
                                className={`QP__httpBoard__url-list-item ${selectClass}`}>
                                    {`${e.method.toUpperCase()} ${e.url}${getQueryString(e.params)}`}
                                </div>)
                        })
                    }
                    </div>    
                </div>
                {hasSelectedOneRequest && <div className="QP__httpBoard__request-details">
                    <div className="QP__httpBoard__title">
                        {!hasSelectedOneRequest && <div>Details</div>}
                        {hasSelectedOneRequest && 
                            TAB_HEADER.map((headerText, index) => {
                                return <div key={index} onClick={() => this.selectDetailTab(index)}
                                className={`QP__httpBoard__title-detail-tab ${getTabSelectedClass(index)}`}>{headerText}</div>
                            })
                        }
                    </div>
                    {hasSelectedOneRequest && <div className="QP__httpBoard__content">
                        { (selectDetailTab === 0) && this.generateHeadersTabContent(data[selectRequestIndex]) }
                        { (selectDetailTab === 1) && data[selectRequestIndex].responseBody &&
                            this.generateResponseTabContent(data[selectRequestIndex]) }
                    </div>}
                </div>}
            </div>
        )
    }

}

export default HttpBoard