import humps from 'humps'

import baseUrl from '../../../../sharedResources/constants/baseUrl'

const CREATE_ADMIN_BGS_COMMENT = 'CREATE_ADMIN_BGS_COMMENT'
const CREATE_ADMIN_BGS_COMMENT_SUCCESS = 'CREATE_ADMIN_BGS_COMMENT_SUCCESS'
const CREATE_ADMIN_BGS_COMMENT_FAILURE = 'CREATE_ADMIN_BGS_COMMENT_FAILURE'

export {
  CREATE_ADMIN_BGS_COMMENT,
  CREATE_ADMIN_BGS_COMMENT_SUCCESS,
  CREATE_ADMIN_BGS_COMMENT_FAILURE
}

const fetchCreateAdminBgsComment = () => {
  return {
    type: CREATE_ADMIN_BGS_COMMENT
  }
}

const createAdminBgsCommentSuccess = comments => {
  return {
    type: CREATE_ADMIN_BGS_COMMENT_SUCCESS,
    comments
  }
}

const createAdminBgsCommentFailure = () => {
  return {
    type: CREATE_ADMIN_BGS_COMMENT_FAILURE
  }
}

const createAdminBgsComment = values => dispatch => {
  dispatch(fetchCreateAdminBgsComment())
  const payload = JSON.stringify(humps.decamelizeKeys(values))
  return fetch(`${baseUrl}/api/v1/admin/bgs/${values.bgsId}/comments.json`, {
    credentials: 'same-origin',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: payload
  })
  .then(response => { return response.json() })
  .then(data => {
    const result = humps.camelizeKeys(data)
    dispatch(createAdminBgsCommentSuccess(result.comments))
  })
  .catch(error => { dispatch(createAdminBgsCommentFailure()) })
}

export {
  createAdminBgsComment
}
