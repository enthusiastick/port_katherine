import humps from 'humps'

import baseUrl from '../../../../sharedResources/constants/baseUrl'

const FETCH_ADMIN_USERS = 'FETCH_ADMIN_USERS'
const FETCH_ADMIN_USERS_SUCCESS = 'FETCH_ADMIN_USERS_SUCCESS'
const FETCH_ADMIN_USERS_FAILURE = 'FETCH_ADMIN_USERS_FAILURE'

export { FETCH_ADMIN_USERS, FETCH_ADMIN_USERS_SUCCESS, FETCH_ADMIN_USERS_FAILURE }

let fetchAdminUsers = () => {
  return {
    type: FETCH_ADMIN_USERS
  }
}

let fetchAdminUsersSuccess = users => {
  return {
    type: FETCH_ADMIN_USERS_SUCCESS,
    users
  }
}

let fetchAdminUsersFailure = () => {
  return {
    type: FETCH_ADMIN_USERS_FAILURE
  }
}

let getAdminUsers = () => dispatch => {
  dispatch(fetchAdminUsers())
  return fetch(`${baseUrl}/api/v1/admin/users.json`, {
    credentials: 'same-origin',
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  })
  .then(response => { return response.json() })
  .then(data => { dispatch(fetchAdminUsersSuccess(humps.camelizeKeys(data.users))) })
  .catch(error => {
    dispatch(fetchAdminUsersFailure())
  })
}

export {
  fetchAdminUsers,
  fetchAdminUsersSuccess,
  fetchAdminUsersFailure,
  getAdminUsers
}
