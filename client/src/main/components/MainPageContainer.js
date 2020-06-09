import MainPage from './MainPage'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {applyCondition, hideErrorMessage} from '../actions'

function mapStateToProps(state) {
    const {
        data
    } = state.datasetList
    const {
        latestError,
        showError
    } = state.ui
    return {
        dataIsEmpty: data.length === 0,
        latestError,
        showError
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        onApplyCondition: applyCondition,
        onHideErrorMessage: hideErrorMessage
    }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(MainPage)