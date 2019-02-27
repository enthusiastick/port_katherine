import humps from 'humps'

import baseUrl from '../../../../sharedResources/constants/baseUrl'

const GET_ADMIN_EVENTS_V2 = 'GET_ADMIN_EVENTS_V2'
const GET_ADMIN_EVENTS_SUCCESS_V2 = 'GET_ADMIN_EVENTS_SUCCESS_V2'
const GET_ADMIN_EVENTS_FAILURE_V2 = 'GET_ADMIN_EVENTS_FAILURE_V2'

export {
  GET_ADMIN_EVENTS_V2,
  GET_ADMIN_EVENTS_SUCCESS_V2,
  GET_ADMIN_EVENTS_FAILURE_V2
}

const fetchAdminEventsV2 = () => ({
  type: GET_ADMIN_EVENTS_V2
})

const getAdminEventsSuccessV2 = events => ({
  type: GET_ADMIN_EVENTS_SUCCESS_V2,
  events
})

const getAdminEventsFailureV2 = () => ({
  type: GET_ADMIN_EVENTS_FAILURE_V2
})

const getAdminEventsV2 = () => dispatch => {
  dispatch(fetchAdminEventsV2())
  return fetch(`${baseUrl}/api/v2/admin/events.json`, {
    credentials: 'same-origin',
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  })
  .then(response => { return response.json() })
  .then(data => { dispatch(getAdminEventsSuccessV2(humps.camelizeKeys(data))) })
  .catch(error => {
    dispatch(getAdminEventsFailureV2())
  })
}

export { getAdminEventsV2 }
