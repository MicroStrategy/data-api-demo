import _ from 'lodash'

export const getProjectId = (state) => {
  return state.ui.projectId
}

export const getInstanceId = (state) => {
  return state.resultTable.instanceId
}

export const getCurrentDatasetAttributes = (state) => {
  return getCurrentDatasetDefProperty(state, "attributes")
}

export const getCurrentDatasetMetrics = (state) => {
  return getCurrentDatasetDefProperty(state, "metrics")
}

const getCurrentDatasetDefProperty = (state, propertyName) => {
  const currentDataset = getCurrentDataset(state)
  return (currentDataset === null)? null: currentDataset.definition.availableObjects[propertyName]
}

export const getCurrentDataset = (state) => {
  const {data, ui} = state.datasetList
  let currentDataset = null 
  if (data.length > 0) {
      currentDataset = data[ui.selectDatasetIndex]
  }
  return currentDataset
}

export const getCreateInstancePostBody = (state) => {
  let postBody = {}
  const attributesUnselect = state.attributes.ui.unselect
  const metricsUnselect = state.metrics.ui.unselect
  const attributeAllSelect = Object.keys(attributesUnselect).length === 0
  const metricAllSelect = Object.keys(metricsUnselect).length === 0
  
  if (!attributeAllSelect || !metricAllSelect){
    const allAttributes = getCurrentDatasetAttributes(state)
    const allMetrics = getCurrentDatasetMetrics(state)

    postBody.requestedObjects = {
      attributes: allAttributes.map(attribute => ({
        id: attribute.id
      })).filter(attribute => !(attribute.id in attributesUnselect)),
      metrics: allMetrics.map(metric => ({
        id: metric.id
      })).filter(metric => !(metric.id in metricsUnselect))
    }    
  }
  
  if(state.filters&&state.filters.viewFilter.expressions){
    postBody.viewFilter = Object.assign({},state.filters.viewFilter.expressions)
  }

  if(state.filters&&state.filters.metricLimits.expressions){
    postBody.metricLimits = Object.assign({},state.filters.metricLimits.expressions)
  }

  const sortingRequest = state.sorting.output
  if (sortingRequest && sortingRequest.length > 0) {
    postBody.sorting = filterUnselectElementFromSortingOutput(sortingRequest, metricsUnselect, attributesUnselect)
  }
  return postBody
}

const filterUnselectElementFromSortingOutput = (sorting, metricsUnselect, attributesUnselect) => {
  return sorting.filter(element => {
    if (element.type === "attribute" || element.type === "form") {
      return !_.get(attributesUnselect, element.attribute.id, false)
    } else {
      return !_.get(metricsUnselect, element.metric.id, false)
    }
  })
}