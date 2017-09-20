import humps from 'humps'
import { SubmissionError } from 'redux-form'

import baseUrl from '../constants/baseUrl'

const FETCH_CREATE_SESSION = 'FETCH_CREATE_SESSION'
const FETCH_CREATE_SESSION_SUCCESS = 'FETCH_CREATE_SESSION_SUCCESS'
const FETCH_CREATE_SESSION_FAILURE = 'FETCH_CREATE_SESSION_FAILURE'

export { FETCH_CREATE_SESSION, FETCH_CREATE_SESSION_SUCCESS, FETCH_CREATE_SESSION_FAILURE }

let fetchCreateSession = () => {
  return {
    type: FETCH_CREATE_SESSION
  }
}

let fetchCreateSessionSuccess = currentUser => {
  return {
    type: FETCH_CREATE_SESSION_SUCCESS,
    currentUser
  }
}

let fetchCreateSessionFailure = () => {
  return {
    type: FETCH_CREATE_SESSION_FAILURE
  }
}

let createSession = values => dispatch => {
  dispatch(fetchCreateSession())
  let payload = JSON.stringify(humps.decamelizeKeys(values))
  return fetch(`${baseUrl}/api/v1/sessions.json`, {
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
      dispatch(fetchCreateSessionSuccess(humps.camelizeKeys(data.user)))
    }
    return data
  })
  .catch(error => {
    dispatch(fetchCreateSessionFailure())
    throw new SubmissionError({ '_error': error })
  })
}

export {
  fetchCreateSession,
  fetchCreateSessionSuccess,
  fetchCreateSessionFailure,
  createSession
}
