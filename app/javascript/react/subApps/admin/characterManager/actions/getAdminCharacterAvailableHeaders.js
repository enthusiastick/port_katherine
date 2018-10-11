import humps from 'humps'

import baseUrl from '../../../../sharedResources/constants/baseUrl.js'

const GET_ADMIN_AVAILABLE_HEADERS = 'GET_ADMIN_AVAILABLE_HEADERS'
const GET_ADMIN_AVAILABLE_HEADERS_SUCCESS = 'GET_ADMIN_AVAILABLE_HEADERS_SUCCESS'
const GET_ADMIN_AVAILABLE_HEADERS_FAILURE = 'GET_ADMIN_AVAILABLE_HEADERS_FAILURE'

export {
  GET_ADMIN_AVAILABLE_HEADERS,
  GET_ADMIN_AVAILABLE_HEADERS_SUCCESS,
  GET_ADMIN_AVAILABLE_HEADERS_FAILURE
}

const fetchAdminAvailableHeaders = () => ({
  type: GET_ADMIN_AVAILABLE_HEADERS
})

const getAdminAvailableHeadersSuccess = payload => ({
  type: GET_ADMIN_AVAILABLE_HEADERS_SUCCESS,
  payload
})

const getAdminAvailableHeadersFailure = () => ({
  type: GET_ADMIN_AVAILABLE_HEADERS_FAILURE
})

const getAdminAvailableHeaders = characterId => dispatch => {
  dispatch(fetchAdminAvailableHeaders())
  return fetch(`${baseUrl}/api/v1/admin/characters/${characterId}/available_headers.json`, {
    credentials: 'same-origin',
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  })
  .then(response => { return response.json() })
  .then(data => {
    const result = humps.camelizeKeys(data)
    dispatch(getAdminAvailableHeadersSuccess(result))
  })
  .catch(error => { dispatch(getAdminAvailableHeadersFailure()) })
}

export {
  getAdminAvailableHeaders
}
