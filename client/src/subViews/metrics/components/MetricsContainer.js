import ItemList from '../../../common/components/ItemList'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {toggleMetricSelection, toggleMetricAllSelection} from '../actions'
import {getCurrentDatasetMetrics} from '../../../utils/stateUtils'

function mapStateToProps(state) {
    const metrics = getCurrentDatasetMetrics(state)
    const unselect = state.metrics.ui.unselect
    
    return {
        items: metrics,
        unselect,
        isAttributeList: false
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        onChangeItemSelection: toggleMetricSelection,
        onChangeAllSelection: toggleMetricAllSelection
    }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(ItemList)