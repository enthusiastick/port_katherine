import humps from 'humps'
import { push } from 'react-router-redux'

import baseUrl from '../../../sharedResources/constants/baseUrl'
import { clearNotices, flashNotice } from '../../../sharedResources/actions/flashNotice'

const UPDATE_BGS = 'UPDATE_BGS'
const UPDATE_BGS_SUCCESS = 'UPDATE_BGS_SUCCESS'
const UPDATE_BGS_FAILURE = 'UPDATE_BGS_FAILURE'

export {
  UPDATE_BGS,
  UPDATE_BGS_SUCCESS,
  UPDATE_BGS_FAILURE
}

const fetchUpdateBgs = () => {
  return {
    type: UPDATE_BGS
  }
}

const updateBgsSuccess = booking => {
  return {
    type: UPDATE_BGS_SUCCESS,
    booking
  }
}

const updateBgsFailure = () => {
  return {
    type: UPDATE_BGS_FAILURE
  }
}

const updateBgs = values => dispatch => {
  dispatch(fetchUpdateBgs())
  const payload = JSON.stringify(humps.decamelizeKeys(values))
  return fetch(`${baseUrl}/api/v1/between_games/${values.id}.json`, {
    credentials: 'same-origin',
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: payload
  })
  .then(response => { return response.json() })
  .then(data => {
    const result = humps.camelizeKeys(data)
    dispatch(updateBgsSuccess(result.booking))
    dispatch(clearNotices())
    dispatch(flashNotice({ success: 'BGS edited successfully. Thank you!' }))
    dispatch(push('/between-events'))
  })
  .catch(error => {
    dispatch(updateBgsFailure())
    dispatch(clearNotices())
    dispatch(flashNotice({ alert: 'There was a problem processing your request.' }))
  })
}

export {
  updateBgs
}
