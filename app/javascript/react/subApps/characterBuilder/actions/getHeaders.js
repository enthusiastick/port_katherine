import humps from 'humps'

import baseUrl from '../../../sharedResources/constants/baseUrl'

const FETCH_HEADERS = 'FETCH_HEADERS'
const FETCH_HEADERS_SUCCESS = 'FETCH_HEADERS_SUCCESS'
const FETCH_HEADERS_FAILURE = 'FETCH_HEADERS_FAILURE'

export {
  FETCH_HEADERS,
  FETCH_HEADERS_SUCCESS,
  FETCH_HEADERS_FAILURE
}

let fetchHeaders = () => {
  return {
    type: FETCH_HEADERS
  }
}

let fetchHeadersSuccess = headers => {
  return {
    type: FETCH_HEADERS_SUCCESS,
    headers
  }
}

let fetchHeadersFailure = () => {
  return {
    type: FETCH_HEADERS_FAILURE
  }
}

let getHeaders = () => dispatch => {
  dispatch(fetchHeaders())
  return fetch(`${baseUrl}/api/v1/headers.json`, {
    credentials: 'same-origin',
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  })
  .then(response => { return response.json() })
  .then(data => { dispatch(fetchHeadersSuccess(humps.camelizeKeys(data))) })
  .catch(error => {
    dispatch(fetchHeadersFailure())
  })
}

export {
  getHeaders
}
