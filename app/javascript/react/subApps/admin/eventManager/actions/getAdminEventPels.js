import humps from 'humps'

import baseUrl from '../../../../sharedResources/constants/baseUrl'

const GET_ADMIN_EVENT_PELS = 'GET_ADMIN_EVENT_PELS'
const GET_ADMIN_EVENT_PELS_SUCCESS = 'GET_ADMIN_EVENT_PELS_SUCCESS'
const GET_ADMIN_EVENT_PELS_FAILURE = 'GET_ADMIN_EVENT_PELS_FAILURE'

export {
  GET_ADMIN_EVENT_PELS,
  GET_ADMIN_EVENT_PELS_SUCCESS,
  GET_ADMIN_EVENT_PELS_FAILURE
}

const fetchAdminEventPels = () => {
  return {
    type: GET_ADMIN_EVENT_PELS
  }
}

const getAdminEventPelsSuccess = pels => {
  return {
    type: GET_ADMIN_EVENT_PELS_SUCCESS,
    pels
  }
}

const getAdminEventPelsFailure = () => {
  return {
    type: GET_ADMIN_EVENT_PELS_FAILURE
  }
}

const getAdminEventPels = slug => dispatch => {
  dispatch(fetchAdminEventPels())
  return fetch(`${baseUrl}/api/v1/admin/events/${slug}/pels.json`, {
    credentials: 'same-origin',
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  })
  .then(response => { return response.json() })
  .then(data => {
    const result = humps.camelizeKeys(data)
    dispatch(getAdminEventPelsSuccess(result.event))
  })
  .catch(error => { dispatch(getAdminEventPelsFailure()) })
}

export {
  getAdminEventPels
}
