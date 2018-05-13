import humps from 'humps'

import baseUrl from '../../../../sharedResources/constants/baseUrl'

const SHOW_ADMIN_BGS = 'SHOW_ADMIN_BGS'
const SHOW_ADMIN_BGS_SUCCESS = 'SHOW_ADMIN_BGS_SUCCESS'
const SHOW_ADMIN_BGS_FAILURE = 'SHOW_ADMIN_BGS_FAILURE'

export {
  SHOW_ADMIN_BGS,
  SHOW_ADMIN_BGS_SUCCESS,
  SHOW_ADMIN_BGS_FAILURE
}

const fetchShowAdminBgs = () => {
  return {
    type: SHOW_ADMIN_BGS
  }
}

const showAdminBgsSuccess = show => {
  return {
    type: SHOW_ADMIN_BGS_SUCCESS,
    show
  }
}

const showAdminBgsFailure = () => {
  return {
    type: SHOW_ADMIN_BGS_FAILURE
  }
}

const showAdminBgs = id => dispatch => {
  dispatch(fetchShowAdminBgs())
  return fetch(`${baseUrl}/api/v1/admin/bgs/${id}.json`, {
    credentials: 'same-origin',
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  })
  .then(response => { return response.json() })
  .then(data => {
    const result = humps.camelizeKeys(data)
    dispatch(showAdminBgsSuccess(result))
  })
  .catch(error => { dispatch(showAdminBgsFailure()) })
}

export {
  showAdminBgs
}
