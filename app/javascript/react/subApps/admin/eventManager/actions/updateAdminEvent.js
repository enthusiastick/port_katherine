import humps from 'humps'

import baseUrl from '../../../../sharedResources/constants/baseUrl'

const UPDATE_ADMIN_EVENT = 'UPDATE_ADMIN_EVENT'
const UPDATE_ADMIN_EVENT_SUCCESS = 'UPDATE_ADMIN_EVENT_SUCCESS'
const UPDATE_ADMIN_EVENT_FAILURE = 'UPDATE_ADMIN_EVENT_FAILURE'

export { UPDATE_ADMIN_EVENT, UPDATE_ADMIN_EVENT_SUCCESS, UPDATE_ADMIN_EVENT_FAILURE }

let fetchUpdateAdminEvent = () => {
  return {
    type: UPDATE_ADMIN_EVENT
  }
}

let fetchUpdateAdminEventSuccess = event => {
  return {
    type: UPDATE_ADMIN_EVENT_SUCCESS,
    event
  }
}

let fetchUpdateAdminEventFailure = () => {
  return {
    type: UPDATE_ADMIN_EVENT_FAILURE
  }
}

let updateAdminEvent = (values, eventSlug) => dispatch => {
  dispatch(fetchUpdateAdminEvent())
  let payload = JSON.stringify(humps.decamelizeKeys(values))
  return fetch(`${baseUrl}/api/v1/admin/events/${eventSlug}.json`, {
    credentials: 'same-origin',
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: payload
  })
  .then(response => { return response.json() })
  .then(data => {
    if (data.error) {
      throw data.error
    } else {
      dispatch(fetchUpdateAdminEventSuccess(humps.camelizeKeys(data.event)))
    }
    return data
  })
  .catch(errors => {
    dispatch(fetchUpdateAdminEventFailure())
    throw errors
  })
}

export {
  fetchUpdateAdminEvent,
  fetchUpdateAdminEventSuccess,
  fetchUpdateAdminEventFailure,
  updateAdminEvent
}
