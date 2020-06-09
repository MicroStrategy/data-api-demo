import SortingListGroup from './SortingListGroup'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { changeSortingElement, changeSortingChoice, addSortingDropdown, changeSortingData, deleteSortingDropdown, clearSortingState } from '../actions'

// {
//     type: "form",
//     order: "descending",
//     id: "8D679D3711D3E4981000E787EC6DE8A4",
//     name: "Category",
//     form: {
//         id: "CCFBE2A5EADB4F50941FB879CCF1721C",
//         name: "DESC"
//     }
// },
// {
//     type: "metric",
//     id: "7FD5B69611D5AC76C000D98A4CC5F24F",
//     name: "Cost",
//     order: "descending"
// }

function mapStateToProps(state) {
    const {
        output,
        ui,
        data
    } = state.sorting
    return {
        output: output,
        data: data,
        ui: ui,
        metrics: state.metrics,
        attributes: state.attributes
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        onChangeSortingElement: changeSortingElement,
        onChangeSortingChoice: changeSortingChoice,
        onAddSortingDropdown: addSortingDropdown,
        onChangeSortingOutputData: changeSortingData,
        onDeleteSortingDropdown: deleteSortingDropdown,
        onClearSortingState: clearSortingState,
    }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(SortingListGroup)