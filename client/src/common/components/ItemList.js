import React from 'react'

import './ItemList.scss'

const ItemList = ({
  items,
  unselect,
  isAttributeList,
  onChangeItemSelection,
  onChangeAllSelection,
}) => {

  const changeAllSelection = () => {
    const currentAllSel = Object.keys(unselect).length === 0
    onChangeAllSelection(!currentAllSel, items)
  }
  const categoryIconClass = (isAttributeList) ? 'qp-attribute-icon' : 'qp-metric-icon'

  return (
    <div className="QP__items">
      {(items.length > 0) && <div className="QP__item QP__items__selectAll" onClick={()=>{changeAllSelection()}}>
        <input readOnly type="checkbox" checked={Object.keys(unselect).length === 0}/>
        <div className={`QP__item-icon ${(Object.keys(unselect).length === 0)? "qp-multi-check-icon" : "qp-multi-uncheck-icon"}`}/>
        <div className="QP__item-all-text">All</div>
      </div>}
      <div className="QP__items-list">
      {
        items.map(item => 
          (<div className="QP__item" key={item.id} onClick={()=>{onChangeItemSelection(item.id)}}>
            <input readOnly type="checkbox" checked={!(item.id in unselect)}/>
            <div className={`QP__item-icon ${!(item.id in unselect)? "qp-multi-check-icon" : "qp-multi-uncheck-icon"}`}/>
            <div className={`QP__item-category-icon ${categoryIconClass}`} />
            <div className="QP__item-name">{item.name}</div>
          </div>))
      }
      </div>
    </div>
  )
}

export default ItemList