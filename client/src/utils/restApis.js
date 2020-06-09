import axios from 'axios'
import demoConfig from '../config'
import {CONSTANTS, HTTP_ACTIONS} from '../constants'


const AUTH_URL = "/auth/login"
const GET_DATASET_URL = "/searches/results"
const CUBE_DEF_URL_PREFIX = "/cubes/"
const REPORT_DEF_URL_PREFIX = "/reports/"
const INSTANCES = "/instances"
const version = "/v2"

const X_MSTR_AUTH_TOKEN = "X-MSTR-AuthToken"
const X_MSTR_PROJECT_ID = "X-MSTR-ProjectID"

const LIMIT = 5

const {CUBE_TYPE} = CONSTANTS

const getAccessToken = () => {
    return sessionStorage.getItem(X_MSTR_AUTH_TOKEN)
}

const storeAccessToken = (accessToken) => {
    sessionStorage.setItem(X_MSTR_AUTH_TOKEN, accessToken);
}

const callRestApi = async (url, options, dispatch) => {
    let finalOptions = options
    let headers = {
        "content-type": "application/json"
    }
    if (url !== AUTH_URL) {
        headers = { 
            ...headers,
            ...options.headers, 
            [X_MSTR_AUTH_TOKEN]: getAccessToken()
        }
    }
    finalOptions = { ...options, headers }
    const response = await axios({
        url: demoConfig.restServerUrl + url,
        withCredentials: true,
        ...finalOptions
    })

    dispatch({
        type: HTTP_ACTIONS.ADD_NEW_HTTP_REQUEST,
        payload: {
            responseStatus: response.status,
            responseHeader: response.headers,
            responseBody: response.data,
            url: url,
            params: finalOptions.params ? finalOptions.params : "",
            requestHeader: finalOptions.headers ? finalOptions.headers : "",
            requestData: finalOptions.data ? finalOptions.data : "",
            method: finalOptions.method ? finalOptions.method : "get"
        }
    })

    return response
}

const login = async (dispatch) => {
    return await callRestApi(AUTH_URL, {
        method: 'post',
        data: {
            loginMode: 1,
            username: demoConfig.username,
            password: demoConfig.password
        }
    }, dispatch)
}

export const loginAndResetToken = async (dispatch) => {
    // May have error here, need to think if we can improve it later
    const loginResponse = await login(dispatch)
    storeAccessToken(loginResponse.headers[X_MSTR_AUTH_TOKEN.toLowerCase()])
   
}

const requestRetry = async (url, options, dispatch) => {
    for (let i = 0; i < CONSTANTS.MAX_TRY_COUNT; i++) {
        try {
            const response = await callRestApi(url, options, dispatch)
            return response.data
        } catch (err) {
            // Only retry once
            const isLastAttempt = i > 0
            if (!isLastAttempt && err.response.status === 401) {
                // Relogin here, if it fails and throws err, OK
                // Change token in session storage 
                await loginAndResetToken(dispatch)
            }
            else {
                throw err
            }
        }
    }
}

export const getDatasetListByType = async (projectID, type, dispatch) => {
    try {
        return await requestRetry(GET_DATASET_URL, {
            headers: {
                [X_MSTR_PROJECT_ID]: projectID
            },
            params: {
                type,
                limit: LIMIT
            },
        }, dispatch)
    }
    catch (ex) {
        return {
            totalItems: 0,
            result: []
        }
    }
}

export const getDatasetDefinition = async (dataset, projectID, dispatch) => {
    // We need to try-catch here to avoid multiple requests end unexpectly
    try {
        const urlPrefix = (dataset.subtype === CUBE_TYPE) ? CUBE_DEF_URL_PREFIX : REPORT_DEF_URL_PREFIX
        const url = version + urlPrefix + dataset.id
        return await requestRetry(url, {
            headers: {
                [X_MSTR_PROJECT_ID]: projectID
            }
        }, dispatch)
    }
    catch (ex) {
        return {
            definition: null
       }
    }
}

export const getAttributeElements = async (projectId, dataset, instanceId, attributeId, dispatch) => {
    const url = `/cubes/${dataset.id}/instance/${instanceId}/attributes/${attributeId}/elements`
    return await requestRetry(url, {
        headers: {
            [X_MSTR_PROJECT_ID]: projectId
        },
        params: {
            offset: 0,
            limit: 50
        }
    }, dispatch)
}

export const getObjectData =  async (dataset, projectID, instanceID, pageIdx, dispatch) => {
    const urlPrefix = (dataset.subtype === CUBE_TYPE) ? CUBE_DEF_URL_PREFIX : REPORT_DEF_URL_PREFIX
    const url = `${version}${urlPrefix}${dataset.id}/instances/${instanceID}` 
    
    return await requestRetry(url, {
        headers: {
            [X_MSTR_PROJECT_ID]: projectID
        },
        params: {
            offset: pageIdx * demoConfig.itemPerPage,
            limit: demoConfig.itemPerPage
        }
    }, dispatch)
}

export const createInstance = async (dataset, projectID, pageIdx, postBody, dispatch) => {
    const urlPrefix = (dataset.subtype === CUBE_TYPE) ? CUBE_DEF_URL_PREFIX : REPORT_DEF_URL_PREFIX
    const url = version + urlPrefix + dataset.id + INSTANCES
    
    return await requestRetry(url, {
        method: 'post',
        headers: {
            [X_MSTR_PROJECT_ID]: projectID
        },
        params: {
            offset: pageIdx * demoConfig.itemPerPage,
            limit: demoConfig.itemPerPage
        },
        data: postBody
    }, dispatch)
}
