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
    changeAllSelection = () => {
        const {onChangeAllSelection} = this.props
        const currentAllSel = Object.keys(this.props.ui.unselect).length === 0
        onChangeAllSelection(!currentAllSel, this.props.data)
      }
     
    render(){
        const {data, dataset_filter,ui,onChangeItemSelection} = this.props
        const {unselect} = ui
        const isEmpty = data.length === 0
        const title = isEmpty ? "Loading datasets..." : "Datasets"
        console.log("unselect " + JSON.stringify(unselect));

        return (
            <div className="QP__items">
            {(data.length === 0) && <div>Loading ...
            </div>}
            {(data.length > 0) && <div className="QP__item QP__items__selectAll" onClick={()=>{this.changeAllSelection()}}>
              <input readOnly type="checkbox" checked={Object.keys(unselect).length === 0}/>
              <div className={`QP__item-icon ${(Object.keys(unselect).length === 0)? "qp-multi-check-icon" : "qp-multi-uncheck-icon"}`}/>
              <div className="QP__item-all-text">All</div>
            </div>}
            <div className="QP__items-list">
            {
            
              data.filter(item => dataset_filter === undefined || dataset_filter === '' || item.name.indexOf(dataset_filter) !== -1).map(item => 
                (<div className="QP__item" key={item.id} onClick={()=>{onChangeItemSelection(item.id)}}>
                  <input readOnly type="checkbox" checked={!(item.id in unselect)}/>
                  <div className={`QP__item-icon ${!(item.id in unselect)? "qp-multi-check-icon" : "qp-multi-uncheck-icon"}`}/>
                  <div className="QP__item-name">{item.name}</div>
                </div>))
            }
            </div>
          </div>
      
        )
    }
}

export default DatasetDropList


/*
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

*/