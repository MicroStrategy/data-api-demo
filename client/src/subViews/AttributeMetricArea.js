import React from 'react'

import AttributesContainer from './attributes/components/AttributesContainer'
import MetricsContainer from './metrics/components/MetricsContainer'


import './AttributeMetricArea.scss'

const AttributeMetricArea = () => {
  return (
    <div className="QP__attributes-metrics-area">
      <div className="QP__attributes-metrics-container">
        <div className="QP__conditions__title">Attributes</div>
        <div className="QP__attributes-metrics-area__list">
          <AttributesContainer />
        </div>
      </div>
      <div className="QP__attributes-metrics-container">
        <div className="QP__conditions__title">Metrics</div>
        <div className="QP__attributes-metrics-area__list">
          <MetricsContainer />
        </div>
      </div>
    </div>
  )
}

export default AttributeMetricArea