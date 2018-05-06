import humps from 'humps'
import { push } from 'react-router-redux'

import baseUrl from '../../../sharedResources/constants/baseUrl'
import { clearNotices, flashNotice } from '../../../sharedResources/actions/flashNotice'

const CREATE_FEEDBACK = 'CREATE_FEEDBACK'
const CREATE_FEEDBACK_SUCCESS = 'CREATE_FEEDBACK_SUCCESS'
const CREATE_FEEDBACK_FAILURE = 'CREATE_FEEDBACK_FAILURE'

export {
  CREATE_FEEDBACK,
  CREATE_FEEDBACK_SUCCESS,
  CREATE_FEEDBACK_FAILURE
}

const fetchCreateFeedback = () => {
  return {
    type: CREATE_FEEDBACK
  }
}

const createFeedbackSuccess = booking => {
  return {
    type: CREATE_FEEDBACK_SUCCESS,
    booking
  }
}

const createFeedbackFailure = () => {
  return {
    type: CREATE_FEEDBACK_FAILURE
  }
}

const createFeedback = values => dispatch => {
  dispatch(fetchCreateFeedback())
  const payload = JSON.stringify(humps.decamelizeKeys(values))
  return fetch(`${baseUrl}/api/v1/bookings/${values.booking}/feedback.json`, {
    credentials: 'same-origin',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: payload
  })
  .then(response => { return response.json() })
  .then(data => {
    const result = humps.camelizeKeys(data)
    dispatch(createFeedbackSuccess(result.booking))
    dispatch(clearNotices())
    dispatch(flashNotice({ success: 'PEL entered successfully. Thank you!' }))
    dispatch(push('/between-events'))
  })
  .catch(error => {
    dispatch(createFeedbackFailure())
    dispatch(clearNotices())
    dispatch(flashNotice({ alert: 'There was a problem processing your request.' }))
  })
}

export {
  createFeedback
}
