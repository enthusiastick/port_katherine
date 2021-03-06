import humps from 'humps'

import baseUrl from '../../../../sharedResources/constants/baseUrl'

const GET_ADMIN_BGS = 'GET_ADMIN_BGS'
const GET_ADMIN_BGS_SUCCESS = 'GET_ADMIN_BGS_SUCCESS'
const GET_ADMIN_BGS_FAILURE = 'GET_ADMIN_BGS_FAILURE'

export {
  GET_ADMIN_BGS,
  GET_ADMIN_BGS_SUCCESS,
  GET_ADMIN_BGS_FAILURE
}

const fetchAdminBgs = () => {
  return {
    type: GET_ADMIN_BGS
  }
}

const getAdminBgsSuccess = index => {
  return {
    type: GET_ADMIN_BGS_SUCCESS,
    index
  }
}

const getAdminBgsFailure = () => {
  return {
    type: GET_ADMIN_BGS_FAILURE
  }
}

const getAdminBgs = eventSlug => dispatch => {
  dispatch(fetchAdminBgs())
  const url = (eventSlug) ? `${baseUrl}/api/v1/admin/events/${eventSlug}/bgs.json` : `${baseUrl}/api/v1/admin/bgs.json`
  return fetch(url, {
    credentials: 'same-origin',
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  })
  .then(response => { return response.json() })
  .then(data => {
    const result = humps.camelizeKeys(data)
    dispatch(getAdminBgsSuccess(result))
  })
  .catch(error => { dispatch(getAdminBgsFailure()) })
}

export {
  getAdminBgs
}
