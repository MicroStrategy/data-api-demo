import {loginAndResetToken, createInstance, getAttributeElements, 
  getObjectData, getDatasetListByType, getDatasetDefinition} from './restApis'
import {CONSTANTS} from '../constants'
import {getProjectId, getInstanceId, 
  getCurrentDataset, getCreateInstancePostBody} from './stateUtils'


export const getDatasetListAsync = async (dispatch, getState) => {
  // Check if we have token first
  await loginAndResetToken(dispatch)

  const state = getState()
  const projectID = getProjectId(state)
  const allTypes = [CONSTANTS.CUBE_TYPE, CONSTANTS.REPORT_TYPE]
  const datasetsList = await Promise.all(allTypes.map(type => getDatasetListByType(projectID, type, dispatch)))
  const datasetList = [...datasetsList[0].result, ...datasetsList[1].result]
  const datasetDefList = await Promise.all(datasetList.map(dataset => getDatasetDefinition(dataset, projectID, dispatch)))

  for (let i = 0; i < datasetList.length; i++) {
      datasetList[i].definition = datasetDefList[i].definition
  }
  const validDatasets = datasetList.filter(dataset => dataset.definition !== null)
  return validDatasets
}

export const createInstanceAsync = async (dispatch, getState, pageIdx) => {
	const state = getState()
	const projectId = getProjectId(state)
	const data = await createInstance(getCurrentDataset(state), 
		projectId, pageIdx, getCreateInstancePostBody(state), dispatch)
	return data
}

export const getObjectDataAsync = async (dispatch, getState, pageIdx) => {
	const state = getState()
  const projectId = getProjectId(state)
  const dataset = getCurrentDataset(state)
  const instanceId = getInstanceId(state)
	return await getObjectData(dataset, projectId, instanceId, pageIdx, dispatch)
}

export const getAttributeElementsAsync = async (dispatch, getState, attributeId) => {
  const state = getState()
  const projectId = getProjectId(state)
  const dataset = getCurrentDataset(state)
  const instanceId = getInstanceId(state)
  return await getAttributeElements(projectId, dataset, instanceId, attributeId, dispatch)
}
