import FilterSummary from './FilterSummary'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {deleteAnExpression, clearAllFilterExpressions} from '../actions'

function mapStateToProps(state) {
    let viewFilterSummary = []
    let metricLimitSummary = []
    if(state.filters){
        viewFilterSummary= state.filters.viewFilter.summary
        metricLimitSummary = state.filters.metricLimits.summary
    }

    return {
        viewFilterSummary,
        metricLimitSummary
    }

}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        onDeleteAnExpression: deleteAnExpression,
        onClearAllFilterExpressions: clearAllFilterExpressions
    }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(FilterSummary)