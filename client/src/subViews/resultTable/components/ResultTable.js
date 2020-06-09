import React from 'react'
import Chart from "react-google-charts"

import './ResultTable.scss'

const VALID_POSITIVE_NUM_REGEX = /^([1-9][0-9]*)$/
const TIMEOUT = 500

class CurrentPageInput extends React.Component{
  static getDerivedStateFromProps(props, state) {
    if (state.realCurPage !== props.currentPageIndex) {
      return {
        realCurPage: props.currentPageIndex,
        curPageInputText: (props.currentPageIndex + 1).toString()
      }
    }
    return state
  }
  
  constructor(){
    super()
    this.state = {
      realCurPage: -1,  // Stored for judging whether current page is changed
      curPageInputText: '0'
    }
  }

  isValidValue(rawValue) {
    if (!rawValue.match(VALID_POSITIVE_NUM_REGEX)) {
      return false
    }
    const value = parseInt(rawValue, 10)
    return value > 0 && value <= this.props.totalPageCount
  }

  onChangeCurrentPage(event) {
    const value = event.target.value
    this.setState({
      curPageInputText: value
    })

    if (this.switchPageTimer !== undefined) {
      clearTimeout(this.switchPageTimer)
    }

    if (this.isValidValue(value) ){
      this.switchPageTimer = setTimeout(() => {
        this.props.onGoToPage(parseInt(value, 10) - 1)
      }, TIMEOUT)
    }
  }

  render() {
    const errorClassName = this.isValidValue(this.state.curPageInputText)?'':'error'
    return (<input type="text" className={`QP__results__current-page ${errorClassName}`} disabled={this.props.loading}
             value={this.state.curPageInputText} onChange={(e) => this.onChangeCurrentPage(e)}/>)
  }
}

class ResultTable extends React.Component{

  render(){
    const options = {
      showRowNumber: false,
      sort: 'disable',
      width: "100%", 
      height: "100%"
    };
    const {data, currentPageIndex, totalPageCount, onGoToPage, loading } = this.props

    return (
      <div className="QP__results">
        <div className="QP__results__title">
          <div className="QP__results__label">RESULTS</div>
          {(currentPageIndex !== -1) && <div className="QP__results__pages">
            <div className="QP__results__changepage">
              <div className="qp-icon qp-first-page-icon"
               onClick={() => {onGoToPage(0)}}/>  
            </div>
            <div className="QP__results__changepage">
              {(currentPageIndex > 0) && 
              <div className="qp-icon qp-prev-page-icon"
               onClick={() => {onGoToPage(currentPageIndex - 1)}}/>
              }
            </div>
            <CurrentPageInput currentPageIndex={currentPageIndex} loading={loading}
             totalPageCount={totalPageCount} onGoToPage={onGoToPage}/>
            <div className="QP__results__pages-separator">of</div>
            <div className="QP__results__pages-total-count">{totalPageCount}</div>
            <div className="QP__results__changepage" >
              {(currentPageIndex < totalPageCount - 1) &&
              <div className="qp-icon qp-next-page-icon"
               onClick={() => {onGoToPage(currentPageIndex + 1)}}/>
              }
            </div>
            <div className="QP__results__changepage">
              <div className="qp-icon qp-last-page-icon"
               onClick={() => {onGoToPage(totalPageCount - 1)}}/>  
            </div>
          </div>}
        </div>
        <div className="QP__results__table">
          {(currentPageIndex !== -1) && (<Chart
            chartType="Table"
            width="100%" 
            height="100%" 
            data={data[currentPageIndex]}
            options={options}
          />)}
        </div>
      </div>
    )
  }
}

export default ResultTable
