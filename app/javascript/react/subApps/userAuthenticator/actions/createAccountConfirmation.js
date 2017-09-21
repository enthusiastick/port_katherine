import humps from 'humps'

import baseUrl from '../../../sharedResources/constants/baseUrl'
import { flashNotice } from '../../../sharedResources/actions/flashNotice'
import { push } from 'react-router-redux'

const FETCH_CREATE_ACCOUNT_CONFIRMATION = 'FETCH_CREATE_ACCOUNT_CONFIRMATION'
const FETCH_CREATE_ACCOUNT_CONFIRMATION_SUCCESS = 'FETCH_CREATE_ACCOUNT_CONFIRMATION_SUCCESS'
const FETCH_CREATE_ACCOUNT_CONFIRMATION_FAILURE = 'FETCH_CREATE_ACCOUNT_CONFIRMATION_FAILURE'

export { FETCH_CREATE_ACCOUNT_CONFIRMATION, FETCH_CREATE_ACCOUNT_CONFIRMATION_SUCCESS, FETCH_CREATE_ACCOUNT_CONFIRMATION_FAILURE }

let fetchCreateAccountConfirmation = () => {
  return {
    type: FETCH_CREATE_ACCOUNT_CONFIRMATION
  }
}

let fetchCreateAccountConfirmationSuccess = () => {
  return {
    type: FETCH_CREATE_ACCOUNT_CONFIRMATION_SUCCESS
  }
}

let fetchCreateAccountConfirmationFailure = () => {
  return {
    type: FETCH_CREATE_ACCOUNT_CONFIRMATION_FAILURE
  }
}

let createAccountConfirmation = values => dispatch => {
  dispatch(fetchCreateAccountConfirmation())
  let payload = JSON.stringify(humps.decamelizeKeys(values))
  return fetch(`${baseUrl}/api/v1/account_confirmations.json`, {
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
      dispatch(fetchCreateAccountConfirmationSuccess())
    }
    dispatch(flashNotice({ success: 'Your email address is confirmed. Thank you.' }))
    dispatch(push('/'))
    return data
  })
  .catch(error => {
    dispatch(fetchCreateAccountConfirmationFailure())
    dispatch(flashNotice({ alert: 'There was a problem confirming your email.' }))
  })
}

export {
  fetchCreateAccountConfirmation,
  fetchCreateAccountConfirmationSuccess,
  fetchCreateAccountConfirmationFailure,
  createAccountConfirmation
}
