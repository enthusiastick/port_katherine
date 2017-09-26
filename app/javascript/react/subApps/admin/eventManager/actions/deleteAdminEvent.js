import humps from 'humps'

import baseUrl from '../../../../sharedResources/constants/baseUrl'

const DELETE_ADMIN_EVENT_REQUEST = 'DELETE_ADMIN_EVENT_REQUEST'
const DELETE_ADMIN_EVENT_REQUEST_SUCCESS = 'DELETE_ADMIN_EVENT_REQUEST_SUCCESS'
const DELETE_ADMIN_EVENT_REQUEST_FAILURE = 'DELETE_ADMIN_EVENT_REQUEST_FAILURE'

let deleteAdminEventRequest = () => {
  return {
    type: DELETE_ADMIN_EVENT_REQUEST
  }
}

let deleteAdminEventRequestSuccess = event => {
  return {
    type: DELETE_ADMIN_EVENT_REQUEST_SUCCESS,
    event
  }
}

let deleteAdminEventRequestFailure = () => {
  return {
    type: DELETE_ADMIN_EVENT_REQUEST_FAILURE
  }
}

let deleteAdminEvent = (eventSlug) => dispatch => {
  dispatch(deleteAdminEventRequest())
  return fetch(`${baseUrl}/api/v1/admin/events/${eventSlug}.json`, {
    credentials: 'same-origin',
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' }
  })
  .then(response => { return response.json() })
  .then(data => {
    if (data.error) {
      throw data.error
    } else {
      dispatch(deleteAdminEventRequestSuccess(humps.camelizeKeys(data.event)))
    }
    return data
  })
  .catch(errors => {
    dispatch(deleteAdminEventRequestFailure())
    throw errors
  })
}

export {
  DELETE_ADMIN_EVENT_REQUEST,
  DELETE_ADMIN_EVENT_REQUEST_SUCCESS,
  DELETE_ADMIN_EVENT_REQUEST_FAILURE
}

export {
  deleteAdminEventRequest,
  deleteAdminEventRequestSuccess,
  deleteAdminEventRequestFailure,
  deleteAdminEvent
}
