import ItemList from '../../../common/components/ItemList'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {toggleAttributeSelection, toggleAttributeAllSelection} from '../actions'
import {getCurrentDatasetAttributes} from '../../../utils/stateUtils'

function mapStateToProps(state) {
    const attributes = getCurrentDatasetAttributes(state)
    const unselect = state.attributes.ui.unselect
    
    return {
        items: attributes,
        unselect,
        isAttributeList: true
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        onChangeItemSelection: toggleAttributeSelection,
        onChangeAllSelection: toggleAttributeAllSelection
    }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(ItemList)