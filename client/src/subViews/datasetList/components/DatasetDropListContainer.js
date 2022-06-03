import DatasetDropList from './DatasetDropList'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {changeSelectDataset, getDatasetList} from '../actions'

import ItemList from '../../../common/components/ItemList'
import {toggleDatasetSelection, toggleDatasetAllSelection} from '../actions'


function mapStateToProps(state) {
    const {
        data,
        ui
    } = state.datasetList

    return {
        data,
        ui
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        onGetDatasetList: getDatasetList,
        onChangeDataset: changeSelectDataset,
        onChangeItemSelection: toggleDatasetSelection,
        onChangeAllSelection: toggleDatasetAllSelection
    }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(DatasetDropList)

/*

function mapStateToProps(state) {
    const datasets = state.datasetList.data
    const unselect = state.datasetList.ui.unselect
    
    return {
        items: datasets,
        unselect,
        isAttributeList: true
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        onChangeItemSelection: toggleDatasetSelection,
        onChangeAllSelection: toggleDatasetAllSelection
    }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(ItemList)
*/