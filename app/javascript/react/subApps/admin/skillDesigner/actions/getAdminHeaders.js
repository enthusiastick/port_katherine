import humps from 'humps'

import baseUrl from '../../../../sharedResources/constants/baseUrl'

const GET_ADMIN_HEADERS = 'GET_ADMIN_HEADERS'
const GET_ADMIN_HEADERS_SUCCESS = 'GET_ADMIN_HEADERS_SUCCESS'
const GET_ADMIN_HEADERS_FAILURE = 'GET_ADMIN_HEADERS_FAILURE'

export {
  GET_ADMIN_HEADERS,
  GET_ADMIN_HEADERS_SUCCESS,
  GET_ADMIN_HEADERS_FAILURE
}

const fetchAdminHeaders = () => ({
  type: GET_ADMIN_HEADERS
})

const getAdminHeadersSuccess = index => ({
  type: GET_ADMIN_HEADERS_SUCCESS,
  index
})

const getAdminHeadersFailure = () => ({
  type: GET_ADMIN_HEADERS_FAILURE
})

const getAdminHeaders = () => dispatch => {
  dispatch(fetchAdminHeaders())
  return fetch(`${baseUrl}/api/v1/admin/headers.json`, {
    credentials: 'same-origin',
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  })
  .then(response => { return response.json() })
  .then(data => {
    const result = humps.camelizeKeys(data)
    dispatch(getAdminHeadersSuccess(result))
  })
  .catch(error => { dispatch(getAdminHeadersFailure()) })
}

export {
  getAdminHeaders
}
