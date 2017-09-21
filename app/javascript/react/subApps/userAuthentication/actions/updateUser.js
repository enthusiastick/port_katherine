import humps from 'humps'

import baseUrl from '../../../sharedResources/constants/baseUrl'
import { getCurrentUser } from '../../../sharedResources/actions/getCurrentUser'

const FETCH_UPDATE_USER = 'FETCH_UPDATE_USER'
const FETCH_UPDATE_USER_SUCCESS = 'FETCH_UPDATE_USER_SUCCESS'
const FETCH_UPDATE_USER_FAILURE = 'FETCH_UPDATE_USER_FAILURE'

export { FETCH_UPDATE_USER, FETCH_UPDATE_USER_SUCCESS, FETCH_UPDATE_USER_FAILURE }

let fetchUpdateUser = () => {
  return {
    type: FETCH_UPDATE_USER
  }
}

let fetchUpdateUserSuccess = user => {
  return {
    type: FETCH_UPDATE_USER_SUCCESS,
    user
  }
}

let fetchUpdateUserFailure = () => {
  return {
    type: FETCH_UPDATE_USER_FAILURE
  }
}

let updateUser = values => dispatch => {
  dispatch(fetchUpdateUser())
  let payload = JSON.stringify(humps.decamelizeKeys(values))
  return fetch(`${baseUrl}/api/v1/users/${values.handle}.json`, {
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
      dispatch(fetchUpdateUserSuccess())
    }
    dispatch(getCurrentUser())
    return data
  })
  .catch(errors => {
    dispatch(fetchUpdateUserFailure())
    throw errors
  })
}

export {
  fetchUpdateUser,
  fetchUpdateUserSuccess,
  fetchUpdateUserFailure,
  updateUser
}
