import humps from 'humps'

import baseUrl from '../../../../sharedResources/constants/baseUrl'

const FETCH_ADMIN_EVENTS = 'FETCH_ADMIN_EVENTS'
const FETCH_ADMIN_EVENTS_SUCCESS = 'FETCH_ADMIN_EVENTS_SUCCESS'
const FETCH_ADMIN_EVENTS_FAILURE = 'FETCH_ADMIN_EVENTS_FAILURE'

export { FETCH_ADMIN_EVENTS, FETCH_ADMIN_EVENTS_SUCCESS, FETCH_ADMIN_EVENTS_FAILURE }

let fetchAdminEvents = () => {
  return {
    type: FETCH_ADMIN_EVENTS
  }
}

let fetchAdminEventsSuccess = events => {
  return {
    type: FETCH_ADMIN_EVENTS_SUCCESS,
    events
  }
}

let fetchAdminEventsFailure = () => {
  return {
    type: FETCH_ADMIN_EVENTS_FAILURE
  }
}

let getAdminEvents = () => dispatch => {
  dispatch(fetchAdminEvents())
  return fetch(`${baseUrl}/api/v1/admin/events.json`, {
    credentials: 'same-origin',
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  })
  .then(response => { return response.json() })
  .then(data => { dispatch(fetchAdminEventsSuccess(humps.camelizeKeys(data.events))) })
  .catch(error => {
    dispatch(fetchAdminEventsFailure())
  })
}

export {
  fetchAdminEvents,
  fetchAdminEventsSuccess,
  fetchAdminEventsFailure,
  getAdminEvents
}
