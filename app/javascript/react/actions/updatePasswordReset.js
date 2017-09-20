import humps from 'humps'

import baseUrl from '../constants/baseUrl'

const FETCH_UPDATE_PASSWORD_RESET = 'FETCH_UPDATE_PASSWORD_RESET'
const FETCH_UPDATE_PASSWORD_RESET_SUCCESS = 'FETCH_UPDATE_PASSWORD_RESET_SUCCESS'
const FETCH_UPDATE_PASSWORD_RESET_FAILURE = 'FETCH_UPDATE_PASSWORD_RESET_FAILURE'

export { FETCH_UPDATE_PASSWORD_RESET, FETCH_UPDATE_PASSWORD_RESET_SUCCESS, FETCH_UPDATE_PASSWORD_RESET_FAILURE }

let fetchUpdatePasswordReset = () => {
  return {
    type: FETCH_UPDATE_PASSWORD_RESET
  }
}

let fetchUpdatePasswordResetSuccess = user => {
  return {
    type: FETCH_UPDATE_PASSWORD_RESET_SUCCESS,
    user
  }
}

let fetchUpdatePasswordResetFailure = () => {
  return {
    type: FETCH_UPDATE_PASSWORD_RESET_FAILURE
  }
}

let updatePasswordReset = values => dispatch => {
  dispatch(fetchUpdatePasswordReset())
  let payload = JSON.stringify(humps.decamelizeKeys(values))
  return fetch(`${baseUrl}/api/v1/password_resets/${values.passwordResetId}.json`, {
    credentials: 'same-origin',
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: payload
  })
  .then(response => { return response.json() })
  .then(data => {
    if (data.error) {
      throw data.error
    } else {
      dispatch(fetchUpdatePasswordResetSuccess(humps.camelizeKeys(data.user)))
    }
    return data
  })
  .catch(error => {
    dispatch(fetchUpdatePasswordResetFailure())
    throw error
  })
}

export {
  fetchUpdatePasswordReset,
  fetchUpdatePasswordResetSuccess,
  fetchUpdatePasswordResetFailure,
  updatePasswordReset
}
