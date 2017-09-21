import baseUrl from '../../../sharedResources/constants/baseUrl'

const FETCH_DESTROY_SESSION = 'FETCH_DESTROY_SESSION'
const FETCH_DESTROY_SESSION_SUCCESS = 'FETCH_DESTROY_SESSION_SUCCESS'
const FETCH_DESTROY_SESSION_FAILURE = 'FETCH_DESTROY_SESSION_FAILURE'

export { FETCH_DESTROY_SESSION, FETCH_DESTROY_SESSION_SUCCESS, FETCH_DESTROY_SESSION_FAILURE }

let fetchDestroySession = () => {
  return {
    type: FETCH_DESTROY_SESSION
  }
}

let fetchDestroySessionSuccess = () => {
  return {
    type: FETCH_DESTROY_SESSION_SUCCESS
  }
}

let fetchDestroySessionFailure = () => {
  return {
    type: FETCH_DESTROY_SESSION_FAILURE
  }
}

let destroySession = () => dispatch => {
  dispatch(fetchDestroySession())
  return fetch(`${baseUrl}/api/v1/sessions/current.json`, {
    credentials: 'same-origin',
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' }
  })
  .then(response => { return response.json() })
  .then(data => {
    if (data.error) {
      throw data.error
    } else {
      dispatch(fetchDestroySessionSuccess())
    }
    return data
  })
  .catch(error => {
    dispatch(fetchDestroySessionFailure())
    throw error
  })
}

export {
  fetchDestroySession,
  fetchDestroySessionSuccess,
  fetchDestroySessionFailure,
  destroySession
}
