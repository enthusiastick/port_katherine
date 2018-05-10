import humps from 'humps'
import { push } from 'react-router-redux'

import baseUrl from '../../../sharedResources/constants/baseUrl'
import { clearNotices, flashNotice } from '../../../sharedResources/actions/flashNotice'

const CREATE_BGS = 'CREATE_BGS'
const CREATE_BGS_SUCCESS = 'CREATE_BGS_SUCCESS'
const CREATE_BGS_FAILURE = 'CREATE_BGS_FAILURE'

export {
  CREATE_BGS,
  CREATE_BGS_SUCCESS,
  CREATE_BGS_FAILURE
}

const fetchCreateBgs = () => {
  return {
    type: CREATE_BGS
  }
}

const createBgsSuccess = booking => {
  return {
    type: CREATE_BGS_SUCCESS,
    booking
  }
}

const createBgsFailure = () => {
  return {
    type: CREATE_BGS_FAILURE
  }
}

const createBgs = values => dispatch => {
  dispatch(fetchCreateBgs())
  const payload = JSON.stringify(humps.decamelizeKeys(values))
  return fetch(`${baseUrl}/api/v1/between_games.json`, {
    credentials: 'same-origin',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: payload
  })
  .then(response => { return response.json() })
  .then(data => {
    const result = humps.camelizeKeys(data)
    dispatch(createBgsSuccess(result.booking))
    dispatch(clearNotices())
    dispatch(flashNotice({ success: 'BGS submitted successfully. Thank you!' }))
    dispatch(push('/between-events'))
  })
  .catch(error => {
    dispatch(createBgsFailure())
    dispatch(clearNotices())
    dispatch(flashNotice({ alert: 'There was a problem processing your request.' }))
  })
}

export {
  createBgs
}
