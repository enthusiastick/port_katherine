import humps from 'humps'

import baseUrl from '../../../../sharedResources/constants/baseUrl'

const FETCH_ADMIN_BACKSTORIES = 'FETCH_ADMIN_BACKSTORIES'
const FETCH_ADMIN_BACKSTORIES_SUCCESS = 'FETCH_ADMIN_BACKSTORIES_SUCCESS'
const FETCH_ADMIN_BACKSTORIES_FAILURE = 'FETCH_ADMIN_BACKSTORIES_FAILURE'

export {
  FETCH_ADMIN_BACKSTORIES,
  FETCH_ADMIN_BACKSTORIES_SUCCESS,
  FETCH_ADMIN_BACKSTORIES_FAILURE
}

let fetchAdminBackstories = () => {
  return {
    type: FETCH_ADMIN_BACKSTORIES
  }
}

let fetchAdminBackstoriesSuccess = payload => {
  return {
    type: FETCH_ADMIN_BACKSTORIES_SUCCESS,
    payload
  }
}

let fetchAdminBackstoriesFailure = () => {
  return {
    type: FETCH_ADMIN_BACKSTORIES_FAILURE
  }
}

let getAdminBackstories = id => dispatch => {
  dispatch(fetchAdminBackstories())
  return fetch(`${baseUrl}/api/v1/admin/characters/${id}/backstories.json`, {
    credentials: 'same-origin',
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  })
  .then(response => { return response.json() })
  .then(data => { dispatch(fetchAdminBackstoriesSuccess(humps.camelizeKeys(data))) })
  .catch(error => {
    dispatch(fetchAdminBackstoriesFailure())
  })
}

export {
  getAdminBackstories
}
