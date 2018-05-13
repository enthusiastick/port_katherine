import humps from 'humps'

import baseUrl from '../../../../sharedResources/constants/baseUrl'

const UPDATE_ADMIN_BGS_ASSIGNEE = 'UPDATE_ADMIN_BGS_ASSIGNEE'
const UPDATE_ADMIN_BGS_ASSIGNEE_SUCCESS = 'UPDATE_ADMIN_BGS_ASSIGNEE_SUCCESS'
const UPDATE_ADMIN_BGS_ASSIGNEE_FAILURE = 'UPDATE_ADMIN_BGS_ASSIGNEE_FAILURE'

export {
  UPDATE_ADMIN_BGS_ASSIGNEE,
  UPDATE_ADMIN_BGS_ASSIGNEE_SUCCESS,
  UPDATE_ADMIN_BGS_ASSIGNEE_FAILURE
}

const fetchUpdateAdminBgsAssignee = () => {
  return {
    type: UPDATE_ADMIN_BGS_ASSIGNEE
  }
}

const updateAdminBgsAssigneeSuccess = show => {
  return {
    type: UPDATE_ADMIN_BGS_ASSIGNEE_SUCCESS,
    show
  }
}

const updateAdminBgsAssigneeFailure = () => {
  return {
    type: UPDATE_ADMIN_BGS_ASSIGNEE_FAILURE
  }
}

const updateAdminBgsAssignee = values => dispatch => {
  dispatch(fetchUpdateAdminBgsAssignee())
  return fetch(`${baseUrl}/api/v1/admin/bgs/${values.bgsId}/assignees/${values.userHandle}.json`, {
    credentials: 'same-origin',
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' }
  })
  .then(response => { return response.json() })
  .then(data => {
    const result = humps.camelizeKeys(data)
    dispatch(updateAdminBgsAssigneeSuccess(result))
  })
  .catch(error => { dispatch(updateAdminBgsAssigneeFailure()) })
}

export {
  updateAdminBgsAssignee
}
