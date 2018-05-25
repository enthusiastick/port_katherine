import humps from 'humps'

import baseUrl from '../../../../sharedResources/constants/baseUrl'

const UPDATE_ADMIN_BGS_RESPONSE = 'UPDATE_ADMIN_BGS_RESPONSE'
const UPDATE_ADMIN_BGS_RESPONSE_SUCCESS = 'UPDATE_ADMIN_BGS_RESPONSE_SUCCESS'
const UPDATE_ADMIN_BGS_RESPONSE_FAILURE = 'UPDATE_ADMIN_BGS_RESPONSE_FAILURE'

export {
  UPDATE_ADMIN_BGS_RESPONSE,
  UPDATE_ADMIN_BGS_RESPONSE_SUCCESS,
  UPDATE_ADMIN_BGS_RESPONSE_FAILURE
}

const fetchUpdateAdminBgsResponse = () => {
  return {
    type: UPDATE_ADMIN_BGS_RESPONSE
  }
}

const updateAdminBgsResponseSuccess = show => {
  return {
    type: UPDATE_ADMIN_BGS_RESPONSE_SUCCESS,
    show
  }
}

const updateAdminBgsResponseFailure = () => {
  return {
    type: UPDATE_ADMIN_BGS_RESPONSE_FAILURE
  }
}

const updateAdminBgsResponse = values => dispatch => {
  dispatch(fetchUpdateAdminBgsResponse())
  const payload = JSON.stringify(humps.decamelizeKeys(values))
  return fetch(`${baseUrl}/api/v1/admin/bgs/${values.bgsId}/answers.json`, {
    credentials: 'same-origin',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: payload
  })
  .then(response => { return response.json() })
  .then(data => {
    const result = humps.camelizeKeys(data)
    dispatch(updateAdminBgsResponseSuccess(result))
  })
  .catch(error => { dispatch(updateAdminBgsResponseFailure()) })
}

export {
  updateAdminBgsResponse
}
