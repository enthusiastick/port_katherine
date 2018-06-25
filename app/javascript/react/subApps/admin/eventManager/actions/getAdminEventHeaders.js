import humps from 'humps'

import baseUrl from '../../../../sharedResources/constants/baseUrl'

const GET_ADMIN_EVENT_HEADERS = 'GET_ADMIN_EVENT_HEADERS'
const GET_ADMIN_EVENT_HEADERS_SUCCESS = 'GET_ADMIN_EVENT_HEADERS_SUCCESS'
const GET_ADMIN_EVENT_HEADERS_FAILURE = 'GET_ADMIN_EVENT_HEADERS_FAILURE'

export {
  GET_ADMIN_EVENT_HEADERS,
  GET_ADMIN_EVENT_HEADERS_SUCCESS,
  GET_ADMIN_EVENT_HEADERS_FAILURE
}

const fetchAdminEventHeaders = () => {
  return {
    type: GET_ADMIN_EVENT_HEADERS
  }
}

const getAdminEventHeadersSuccess = characters => {
  return {
    type: GET_ADMIN_EVENT_HEADERS_SUCCESS,
    characters
  }
}

const getAdminEventHeadersFailure = () => {
  return {
    type: GET_ADMIN_EVENT_HEADERS_FAILURE
  }
}

const getAdminEventHeaders = (eventSlug, headerId) => dispatch => {
  dispatch(fetchAdminEventHeaders())
  const url = (headerId) ? `${baseUrl}/api/v1/admin/events/${eventSlug}/character_headers/${headerId}.json` : `${baseUrl}/api/v1/admin/events/${eventSlug}/character_headers.json`
  return fetch(url, {
    credentials: 'same-origin',
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  })
  .then(response => { return response.json() })
  .then(data => {
    const result = humps.camelizeKeys(data)
    dispatch(getAdminEventHeadersSuccess(result))
  })
  .catch(error => {
    dispatch(getAdminEventHeadersFailure())
  })
}

export {
  getAdminEventHeaders
}
