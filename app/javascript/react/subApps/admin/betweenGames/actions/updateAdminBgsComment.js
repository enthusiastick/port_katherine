import humps from 'humps'

import baseUrl from '../../../../sharedResources/constants/baseUrl'

const UPDATE_ADMIN_BGS_COMMENT = 'UPDATE_ADMIN_BGS_COMMENT'
const UPDATE_ADMIN_BGS_COMMENT_SUCCESS = 'UPDATE_ADMIN_BGS_COMMENT_SUCCESS'
const UPDATE_ADMIN_BGS_COMMENT_FAILURE = 'UPDATE_ADMIN_BGS_COMMENT_FAILURE'

export {
  UPDATE_ADMIN_BGS_COMMENT,
  UPDATE_ADMIN_BGS_COMMENT_SUCCESS,
  UPDATE_ADMIN_BGS_COMMENT_FAILURE
}

const fetchUpdateAdminBgsComment = () => {
  return {
    type: UPDATE_ADMIN_BGS_COMMENT
  }
}

const updateAdminBgsCommentSuccess = comments => {
  return {
    type: UPDATE_ADMIN_BGS_COMMENT_SUCCESS,
    comments
  }
}

const updateAdminBgsCommentFailure = () => {
  return {
    type: UPDATE_ADMIN_BGS_COMMENT_FAILURE
  }
}

const updateAdminBgsComment = values => dispatch => {
  dispatch(fetchUpdateAdminBgsComment())
  const payload = JSON.stringify(humps.decamelizeKeys(values))
  return fetch(`${baseUrl}/api/v1/admin/bgs/${values.bgsId}/comments/${values.id}.json`, {
    credentials: 'same-origin',
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: payload
  })
  .then(response => { return response.json() })
  .then(data => {
    const result = humps.camelizeKeys(data)
    dispatch(updateAdminBgsCommentSuccess(result.comments))
  })
  .catch(error => { dispatch(updateAdminBgsCommentFailure()) })
}

export {
  updateAdminBgsComment
}
