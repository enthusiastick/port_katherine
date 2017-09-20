import humps from 'humps'

import baseUrl from '../constants/baseUrl'

const FETCH_CREATE_PASSWORD_RESET = 'FETCH_CREATE_PASSWORD_RESET'
const FETCH_CREATE_PASSWORD_RESET_SUCCESS = 'FETCH_CREATE_PASSWORD_RESET_SUCCESS'
const FETCH_CREATE_PASSWORD_RESET_FAILURE = 'FETCH_CREATE_PASSWORD_RESET_FAILURE'

export { FETCH_CREATE_PASSWORD_RESET, FETCH_CREATE_PASSWORD_RESET_SUCCESS, FETCH_CREATE_PASSWORD_RESET_FAILURE }

let fetchCreatePasswordReset = () => {
  return {
    type: FETCH_CREATE_PASSWORD_RESET
  }
}

let fetchCreatePasswordResetSuccess = user => {
  return {
    type: FETCH_CREATE_PASSWORD_RESET_SUCCESS,
    user
  }
}

let fetchCreatePasswordResetFailure = () => {
  return {
    type: FETCH_CREATE_PASSWORD_RESET_FAILURE
  }
}

let createPasswordReset = values => dispatch => {
  dispatch(fetchCreatePasswordReset())
  let payload = JSON.stringify(humps.decamelizeKeys(values))
  return fetch(`${baseUrl}/api/v1/password_resets.json`, {
    credentials: 'same-origin',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: payload
  })
  .then(response => { return response.json() })
  .then(data => {
    if (data.error) {
      throw data.error
    } else {
      dispatch(fetchCreatePasswordResetSuccess(humps.camelizeKeys(data.user)))
    }
    return data
  })
  .catch(error => {
    dispatch(fetchCreatePasswordResetFailure())
    throw error
  })
}

export {
  fetchCreatePasswordReset,
  fetchCreatePasswordResetSuccess,
  fetchCreatePasswordResetFailure,
  createPasswordReset
}
