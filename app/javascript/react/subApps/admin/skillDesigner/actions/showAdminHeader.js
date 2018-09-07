import humps from 'humps'

import baseUrl from '../../../../sharedResources/constants/baseUrl'

const SHOW_ADMIN_HEADER = 'SHOW_ADMIN_HEADER'
const SHOW_ADMIN_HEADER_SUCCESS = 'SHOW_ADMIN_HEADER_SUCCESS'
const SHOW_ADMIN_HEADER_FAILURE = 'SHOW_ADMIN_HEADER_FAILURE'

export {
  SHOW_ADMIN_HEADER,
  SHOW_ADMIN_HEADER_SUCCESS,
  SHOW_ADMIN_HEADER_FAILURE
}

const fetchshowAdminHeader = () => ({
  type: SHOW_ADMIN_HEADER
})

const showAdminHeaderSuccess = show => ({
  type: SHOW_ADMIN_HEADER_SUCCESS,
  show
})

const showAdminHeaderFailure = () => ({
  type: SHOW_ADMIN_HEADER_FAILURE
})

const showAdminHeader = skillId => dispatch => {
  dispatch(fetchshowAdminHeader())
  return fetch(`${baseUrl}/api/v1/admin/headers/${skillId}.json`, {
    credentials: 'same-origin',
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  })
  .then(response => { return response.json() })
  .then(data => {
    const result = humps.camelizeKeys(data)
    dispatch(showAdminHeaderSuccess(result))
  })
  .catch(error => { dispatch(showAdminHeaderFailure()) })
}

export {
  showAdminHeader
}
