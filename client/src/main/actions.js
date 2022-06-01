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

export const applyCondition = () => {

  // Re-apply condition, must be start with 0
  return (dispatch, getState) => {

    const state = getState()
    const projectId = getProjectId(state)
    const dataset = getCurrentDataset(state)
    const body = getCreateInstancePostBody(state)
    //const idToken = await createIdentityToken(dispatch)

    const d = new Date();
    d.setTime(d.getTime() + (5*60*1000));
     let expires = "expires="+ d.toUTCString();

    document.cookie =  "mstr_idtoken=" + getAccessToken() + ";" + expires + ";path=/";

    window.open("dossier.html?projectId=" + projectId  + "&datasetId=" + dataset.id + "&datasetType=" + dataset.subtype + "&body=" +btoa(JSON.stringify(body)),'myDossier')



    /*createInstanceAsync(dispatch, getState, 0).then((data) => {
      dispatch({
				type: RESULT_ACTIONS.REFRESH_RESULT_PANEL,
				payload: data
			})
    }).catch(httpErrorHandling(dispatch, MAIN_UI_ACTIONS.DISPLAY_ERROR_MSG))

    */

  };
}