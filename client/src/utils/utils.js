import * as $ from 'jquery'
import {flatMap} from 'lodash'


export const decodeHtml = (html) => {
  return $('<div/>').html(html).text()
}

export const getQueryString = (params) => {
  if (!params) {
    return ''
  }
  let str = '?';
  for (const p in params) {
    if (params.hasOwnProperty(p)) {
      str += p + '=' + params[p] + '&'
    }
  }
  return str.substring(0, str.length - 1);
}

export const httpErrorHandling = (dispatch, errorActionType) => {
  return (err) => {
    console.log('err response:', err)
    dispatch({
      type: errorActionType,
      payload: (err.response && err.response.data && err.response.data.message) || 'Request error!'
    })
  }
}

export const sortingDataTransform = (definition) => {
  if (definition && definition.availableObjects) {
    return definition.availableObjects.attributes.map(element => {
      return {
        type: "attribute",
        attribute: {
          id: element.id,
          name: element.name
        }
      }
    })
      .concat(
        definition.availableObjects.metrics.map(element => {
          return {
            type: "metric",
            metric: {
              id: element.id,
              name: element.name
            }
          }
        }))
      .concat(
        flatMap(definition.availableObjects.attributes.filter(element => {
          return element.forms !== undefined
        }), element => {
          return element.forms.map(subElement => {
            return {
              type: "form",
              attribute: {
                id: element.id,
                name: element.name
              },
              "form": {
                id: subElement.id,
                name: subElement.name
              }
            }
          })
        }
        )
      )
  } else {
    return []
  }
}
