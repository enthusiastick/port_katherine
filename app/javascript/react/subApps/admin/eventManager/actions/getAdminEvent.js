import humps from 'humps'

import baseUrl from '../../../../sharedResources/constants/baseUrl'

const GET_ADMIN_EVENT = 'GET_ADMIN_EVENT'
const GET_ADMIN_EVENT_SUCCESS = 'GET_ADMIN_EVENT_SUCCESS'
const GET_ADMIN_EVENT_FAILURE = 'GET_ADMIN_EVENT_FAILURE'

export {
  GET_ADMIN_EVENT,
  GET_ADMIN_EVENT_SUCCESS,
  GET_ADMIN_EVENT_FAILURE
}

const fetchAdminEvent = () => ({
  type: GET_ADMIN_EVENT
})

const getAdminEventSuccess = event => ({
  type: GET_ADMIN_EVENT_SUCCESS,
  event
})

const getAdminEventFailure = () => ({
  type: GET_ADMIN_EVENT_FAILURE
})

const getAdminEvent = slug => dispatch => {
  dispatch(fetchAdminEvent())
  return fetch(`${baseUrl}/api/v2/admin/events/${slug}.json`, {
    credentials: 'same-origin',
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  })
  .then(response => { return response.json() })
  .then(data => {
    const result = humps.camelizeKeys(data.event)
    dispatch(getAdminEventSuccess(result)) })
  .catch(error => {
    dispatch(getAdminEventFailure())
  })
}

export { getAdminEvent }
