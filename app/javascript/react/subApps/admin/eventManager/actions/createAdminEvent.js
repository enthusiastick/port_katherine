import humps from 'humps'

import baseUrl from '../../../../sharedResources/constants/baseUrl'

const CREATE_ADMIN_EVENT = 'CREATE_ADMIN_EVENT'
const CREATE_ADMIN_EVENT_SUCCESS = 'CREATE_ADMIN_EVENT_SUCCESS'
const CREATE_ADMIN_EVENT_FAILURE = 'CREATE_ADMIN_EVENT_FAILURE'

export { CREATE_ADMIN_EVENT, CREATE_ADMIN_EVENT_SUCCESS, CREATE_ADMIN_EVENT_FAILURE }

let fetchCreateAdminEvent = () => {
  return {
    type: CREATE_ADMIN_EVENT
  }
}

let fetchCreateAdminEventSuccess = newEvent => {
  return {
    type: CREATE_ADMIN_EVENT_SUCCESS,
    newEvent
  }
}

let fetchCreateAdminEventFailure = () => {
  return {
    type: CREATE_ADMIN_EVENT_FAILURE
  }
}

let createAdminEvent = values => dispatch => {
  dispatch(fetchCreateAdminEvent())
  let payload = JSON.stringify(humps.decamelizeKeys(values))
  return fetch(`${baseUrl}/api/v1/admin/events.json`, {
    credentials: 'same-origin',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: payload
  })
  .then(response => { return response.json() })
  .then(data => {
    if (data.error) {
      throw data.error
    } else {
      dispatch(fetchCreateAdminEventSuccess(humps.camelizeKeys(data.event)))
    }
    return data
  })
  .catch(errors => {
    dispatch(fetchCreateUserFailure())
    throw errors
  })
}

export {
  fetchCreateAdminEvent,
  fetchCreateAdminEventSuccess,
  fetchCreateAdminEventFailure,
  createAdminEvent
}
