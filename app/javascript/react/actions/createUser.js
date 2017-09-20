import humps from 'humps'

import baseUrl from '../constants/baseUrl'

const FETCH_CREATE_USER = 'FETCH_CREATE_USER'
const FETCH_CREATE_USER_SUCCESS = 'FETCH_CREATE_USER_SUCCESS'
const FETCH_CREATE_USER_FAILURE = 'FETCH_CREATE_USER_FAILURE'

export { FETCH_CREATE_USER, FETCH_CREATE_USER_SUCCESS, FETCH_CREATE_USER_FAILURE }

let fetchCreateUser = () => {
  return {
    type: FETCH_CREATE_USER
  }
}

let fetchCreateUserSucess = newUser => {
  return {
    type: FETCH_CREATE_USER_SUCCESS,
    newUser
  }

}

let fetchCreateUserFailure = () => {
  return {
    type: FETCH_CREATE_USER_FAILURE
  }
}

let createUser = values => dispatch => {
  dispatch(fetchCreateUser())
  let payload = JSON.stringify(humps.decamelizeKeys(values))
  return fetch(`${baseUrl}/api/v1/users.json`, {
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
      dispatch(fetchCreateUserSucess(humps.camelizeKeys(data.user)))
    }
    return data
  })
  .catch(errors => {
    dispatch(fetchCreateUserFailure())
    throw errors
  })
}

export {
  fetchCreateUser,
  fetchCreateUserSucess,
  fetchCreateUserFailure,
  createUser
}
