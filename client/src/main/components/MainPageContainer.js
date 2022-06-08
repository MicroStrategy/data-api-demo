import MainPage from './MainPage'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {applyCondition, hideErrorMessage,changeFilter} from '../actions'

function mapStateToProps(state) {
    const {
        data
    } = state.datasetList
    const {
        latestError,
        showError
    } = state.ui
    const {
        filter 
    } = state.datasetList
    return {
        dataIsEmpty: data.length === 0,
        latestError,
        showError,
        filter
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        onApplyCondition: applyCondition,
        onHideErrorMessage: hideErrorMessage,
        onChangeFilter: changeFilter
    }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(MainPage)