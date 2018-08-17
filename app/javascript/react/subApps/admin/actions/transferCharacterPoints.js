import humps from 'humps'

import baseUrl from '../../../sharedResources/constants/baseUrl'
import { clearNotices, flashNotice } from '../../../sharedResources/actions/flashNotice'

const TRANSFER_CHARACTER_POINTS = 'TRANSFER_CHARACTER_POINTS'
const TRANSFER_CHARACTER_POINTS_SUCCESS = 'TRANSFER_CHARACTER_POINTS_SUCCESS'
const TRANSFER_CHARACTER_POINTS_FAILURE = 'TRANSFER_CHARACTER_POINTS_FAILURE'

export {
  TRANSFER_CHARACTER_POINTS,
  TRANSFER_CHARACTER_POINTS_SUCCESS,
  TRANSFER_CHARACTER_POINTS_FAILURE
}

const fetchTransferCP = () => ({
  type: TRANSFER_CHARACTER_POINTS
})

const transferCPSuccess = payload => ({
  type: TRANSFER_CHARACTER_POINTS_SUCCESS,
  payload
})

const transferCPFailure = () => ({
  type: TRANSFER_CHARACTER_POINTS_FAILURE
})

const transferCP = (values, resetForm, setSubmitting) => dispatch => {
  dispatch(fetchTransferCP())
  const payload = JSON.stringify(humps.decamelizeKeys(values))
  return fetch(`${baseUrl}/api/v1/admin/transfer_character_points.json`, {
    credentials: 'same-origin',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: payload
  })
  .then(response => { return response.json() })
  .then(data => {
    if (data.error) {
      throw data.error
    } else {
      dispatch(transferCPSuccess(humps.decamelizeKeys(data)))
      dispatch(clearNotices())
      dispatch(flashNotice({ success: 'CP transferred successfully.' }))
      resetForm()
    }
  })
  .catch(errors => {
    dispatch(transferCPFailure())
    dispatch(clearNotices())
    dispatch(flashNotice({ alert: 'There was a problem processing your request.' }))
    setSubmitting(false)
    throw errors
  })
}

export {
  transferCP
}
