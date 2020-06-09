import DatasetDropList from './DatasetDropList'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {changeSelectDataset, getDatasetList} from '../actions'

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
    }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(DatasetDropList)