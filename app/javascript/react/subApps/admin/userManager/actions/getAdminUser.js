import humps from 'humps'

import baseUrl from '../../../../sharedResources/constants/baseUrl'

const FETCH_ADMIN_USER = 'FETCH_ADMIN_USER'
const FETCH_ADMIN_USER_SUCCESS = 'FETCH_ADMIN_USER_SUCCESS'
const FETCH_ADMIN_USER_FAILURE = 'FETCH_ADMIN_USER_FAILURE'

export {
  FETCH_ADMIN_USER,
  FETCH_ADMIN_USER_SUCCESS,
  FETCH_ADMIN_USER_FAILURE
}

let fetchAdminUser = () => {
  return {
    type: FETCH_ADMIN_USER
  }
}

let fetchAdminUserSuccess = user => {
  return {
    type: FETCH_ADMIN_USER_SUCCESS,
    user
  }
}

let fetchAdminUserFailure = () => {
  return {
    type: FETCH_ADMIN_USER_FAILURE
  }
}

let getAdminUser = id => dispatch => {
  dispatch(fetchAdminUser())
  return fetch(`${baseUrl}/api/v1/admin/users/${id}.json`, {
    credentials: 'same-origin',
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  })
  .then(response => { return response.json() })
  .then(data => { dispatch(fetchAdminUserSuccess(humps.camelizeKeys(data.user))) })
  .catch(error => {
    dispatch(fetchAdminUserFailure())
  })
}

export {
  getAdminUser
}
