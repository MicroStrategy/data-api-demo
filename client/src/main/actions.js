import {createInstanceAsync} from '../utils/restUtils'
import {httpErrorHandling} from '../utils/utils'
import {MAIN_UI_ACTIONS, RESULT_ACTIONS} from '../constants'
import {getProjectId, getInstanceId, 
  getCurrentDataset, getCreateInstancePostBody} from '../utils/stateUtils'

  import {getAccessToken} from '../utils/restApis'

export const hideErrorMessage = () => {
  return {
    type: MAIN_UI_ACTIONS.HIDE_ERROR_MSG
  }
}

export const changeFilter = (new_filter) => {
  return {
    type: MAIN_UI_ACTIONS.FILTER_DS_LIST,
    payload:new_filter 
  }
}
export const applyCondition = () => {

  // Re-apply condition, must be start with 0
  return (dispatch, getState) => {

    const state = getState()
    const projectId = getProjectId(state)
    const currentDatasets = getCurrentDataset(state)
    const body = getCreateInstancePostBody(state)
    //const idToken = await createIdentityToken(dispatch)

    const d = new Date();
    d.setTime(d.getTime() + (5*60*1000));
     let expires = "expires="+ d.toUTCString();

    document.cookie =  "mstr_idtoken=" + getAccessToken() + ";" + expires + ";path=/";
    var datasetIds = [];

    for(var i=0;i<currentDatasets.length;i++)
   {
     var ds = {};
     ds.id = currentDatasets[i].id;
     ds.name = currentDatasets[i].name;
     ds.subtype = currentDatasets[i].subtype;
     ds.projectId = currentDatasets[i].projectId;
    datasetIds.push(ds)
   }
   console.log(JSON.stringify(datasetIds));
   var str = JSON.stringify(datasetIds);
   var b64 = btoa(str);
    window.open("dossier.html?projectId=" + projectId  + "&datasets=" + b64  + "&body=" +btoa(JSON.stringify(body)),'myDossier')



    

  };
}