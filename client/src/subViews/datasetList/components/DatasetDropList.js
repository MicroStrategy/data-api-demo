import React from 'react'

import '../../../include/bootstrap'
import './DatasetDropList.scss'

import {DropdownButton, MenuItem} from 'react-bootstrap'

class DatasetDropList extends React.Component{
    componentWillMount(){
        this.props.onGetDatasetList()
    }

    onSelectAlert(eventKey){
        const {ui, onChangeDataset} = this.props
        const {selectDatasetIndex} = ui
        if (eventKey === selectDatasetIndex) {
            return
        }
        else{
            onChangeDataset(eventKey)
        }
    }

    render(){
        const {data, ui} = this.props
        const {selectDatasetIndex} = ui
        const isEmpty = data.length === 0
        const title = isEmpty ? "Loading datasets..." : data[selectDatasetIndex].name
        return (
            <div className="QP__datasetList">
                <div className="QP__datasetList__title">Datasets</div>
                <DropdownButton id="dataset-list-dropdown" className="QP__datasetList__dropdownButton" 
                    disabled={isEmpty} title={title}>
                    {
                        data.map((dataset, i) => (
                            <MenuItem key={i} active={i === selectDatasetIndex} eventKey={i} onSelect={(ek) => this.onSelectAlert(ek)}>
                                {dataset.name}
                            </MenuItem>
                        ))
                    }
                </DropdownButton>
            </div>
        )
    }
}

export default DatasetDropList
