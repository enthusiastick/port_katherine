import humps from 'humps'
import { push } from 'react-router-redux'

import baseUrl from '../../../../sharedResources/constants/baseUrl'
import { clearNotices, flashNotice } from '../../../../sharedResources/actions/flashNotice'

const CREATE_ADMIN_BGS = 'CREATE_ADMIN_BGS'
const CREATE_ADMIN_BGS_SUCCESS = 'CREATE_ADMIN_BGS_SUCCESS'
const CREATE_ADMIN_BGS_FAILURE = 'CREATE_ADMIN_BGS_FAILURE'

export {
  CREATE_ADMIN_BGS,
  CREATE_ADMIN_BGS_SUCCESS,
  CREATE_ADMIN_BGS_FAILURE
}

const fetchCreateAdminBgs = () => ({
  type: CREATE_ADMIN_BGS
})

const createAdminBgsSuccess = create => ({
  type: CREATE_ADMIN_BGS_SUCCESS,
  create
})

const createAdminBgsFailure = () => ({
  type: CREATE_ADMIN_BGS_FAILURE
})

const createAdminBgs = values => dispatch => {
  dispatch(fetchCreateAdminBgs())
  const payload = JSON.stringify(humps.decamelizeKeys(values))
  return fetch(`${baseUrl}/api/v1/admin/bgs.json`, {
    credentials: 'same-origin',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: payload
  })
  .then(response => { return response.json() })
  .then(data => {
    const result = humps.camelizeKeys(data)
    dispatch(createAdminBgsSuccess(result))
    dispatch(clearNotices())
    dispatch(flashNotice({ success: 'BGS created succesfully.' }))
    dispatch(push(`/admin/bgs/${result.betweenGame.id}`))
  })
  .catch(error => {
    dispatch(createAdminBgsFailure())
    dispatch(clearNotices())
    dispatch(flashNotice({ alert: 'There was a problem processing your request.' }))
  })
}

export {
  createAdminBgs
}
