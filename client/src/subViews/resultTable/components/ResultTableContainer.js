import ResultTable from './ResultTable'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {goToPage} from '../actions'

function mapStateToProps(state) {
  const {data, ui} = state.resultTable
  const {currentPageIndex, totalPageCount, loading} = ui

  return {
    data,
    currentPageIndex, 
    totalPageCount, 
    loading
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    onGoToPage: goToPage,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ResultTable)