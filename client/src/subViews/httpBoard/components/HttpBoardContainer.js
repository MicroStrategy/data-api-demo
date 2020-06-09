import HttpBoard from './HttpBoard'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { clearRequests, selectRequest, selectDetailTab} from '../actions'


function mapStateToProps(state) {
    const {
        data,
        ui
    } = state.http
    return {
        data,
        ui
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        onSelectRequest: selectRequest,
        onSelectDetailTab: selectDetailTab,
        onClearRequests: clearRequests
    }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(HttpBoard)
